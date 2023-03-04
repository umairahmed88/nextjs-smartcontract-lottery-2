import Head from "next/head";
import { Inter } from "next/font/google";
// import ManualHeader from "../components/ManualHeader.jsx";
import Header from "../components/Header.js";
import LotteryEntrance from "../components/LotteryEntrance";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Smart Contract Lottery App</title>
				<meta name='description' content='our Smart Contract' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* <ManualHeader /> */}
			<Header />
			<LotteryEntrance />
		</>
	);
}
