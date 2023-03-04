import { useWeb3Contract } from "react-moralis";
import abi from "../constants/abi.json";
import contractAddresses from "../constants/contractAddresses.json";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEntrance() {
	const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
	const chainId = parseInt(chainIdHex);
	const raffleAddress =
		chainId in contractAddresses ? contractAddresses[chainId][0] : null;
	const [entranceFee, setEntranceFee] = useState("0");
	const [numPlayers, setNumPlayers] = useState("0");
	const [recentWinner, setRecentWinner] = useState("0");

	const dispatch = useNotification();

	const { runContractFunction: enterRaffle } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "enterRaffle",
		params: {},
		msgValue: entranceFee,
	});

	const { runContractFunction: getEntranceFee } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getEntranceFee",
		params: {},
	});

	const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getNumberOfPlayers",
		params: {},
	});

	const { runContractFunction: getRecentWinner } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getRecentWinner",
		params: {},
	});

	async function updateUI() {
		const entranceFeeFromCall = (await getEntranceFee()).toString();
		setEntranceFee(entranceFeeFromCall);
	}

	async function updateUI() {
		const entranceFeeFromCall = (await getEntranceFee()).toString();
		const numPlayersFromCall = (await getNumberOfPlayers()).toString();
		const recentWinnerFromCall = await getRecentWinner();
		setEntranceFee(entranceFeeFromCall);
		setNumPlayers(numPlayersFromCall);
		setRecentWinner(recentWinnerFromCall);
	}

	useEffect(() => {
		if (isWeb3Enabled) {
			updateUI();
		}
	}, [isWeb3Enabled]);

	const handleSuccess = async function (tx) {
		await tx.wait(1);
		handleNewNotification(tx);
		updateUI();
	};

	const handleNewNotification = async function () {
		dispatch({
			type: "info",
			message: "Transaction Complete!",
			title: "Tx Notification",
			position: "topR",
			icon: "bell",
		});
	};

	return (
		<div>
			Hi Lottery Entrance Fee is!
			{raffleAddress ? (
				<div>
					<button
						onClick={async function () {
							await enterRaffle({
								onSuccess: handleSuccess,
							});
						}}
					>
						Enter Raffle
						<br />
					</button>
					<br />
					Entrance Fee: {ethers.utils.formatUnits(entranceFee)} ETH
					<br />
					Number of Players:{numPlayers}
					<br />
					Recent Winner: {recentWinner}
				</div>
			) : (
				<div>No Raffle Address detected </div>
			)}
		</div>
	);
}
