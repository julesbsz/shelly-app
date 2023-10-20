import { useEffect, useState } from "react";
import "./App.css";
import DeviceDataComponent from "./components/DeviceData";
import { useToast } from "@/components/ui/use-toast";

function App() {
	const { toast } = useToast();

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	const displayToast = (message: string) => {
		toast({
			title: "Unable to fetch device data.",
			description: message,
			duration: 5000,
		});
	};

	const getDeviceData = async () => {
		setLoading(true);
		await fetch("https://shelly-86-eu.shelly.cloud/device/status?id=80646F827174&auth_key=MWRmYzM2dWlkE62C6C4C76F817CE0A3D2902F5B5D4C115E49B28CF8539114D9246505DE5D368D560D06020A92480")
			.then((res) => {
				res.json().then((data) => {
					console.log("data:", data);
					setData(data);
				});
			})
			.catch(() => {
				setLoading(false);
				displayToast("An error occurred while fetching device data, please try again later.");
			});

		setLoading(false);
	};

	const initWSS = () => {
		console.log("initWSS");
		try {
			const ws = (new WebSocket("wss://shelly-86-eu.shelly.cloud:6113/shelly/wss/hk_sock?t=MWRmYzM2dWlkE62C6C4C76F817CE0A3D2902F5B5D4C115E49B28CF8539114D9246505DE5D368D560D06020A92480").onerror = (e) => {
				console.log("ws error:", e);
			});
			// ws.onopen = () => {
			// 	console.log("ws opened");
			// };
			// ws.onmessage = (e) => {
			// 	console.log("ws message:", e);
			// };
			// ws.onclose = () => {
			// 	console.log("ws closed");
			// };
		} catch (e) {
			console.log("ws error:", e);
		}
	};

	useEffect(() => {
		getDeviceData();
		// initWSS();
	}, []);

	return <>{loading ? <p>loading device data...</p> : data ? <DeviceDataComponent data={data} /> : <p>no data</p>}</>;
}

export default App;
