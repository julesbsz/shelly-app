import { useEffect, useState } from "react";
import "./App.css";
import DeviceDataComponent from "./components/DeviceData";
import { useToast } from "@/components/ui/use-toast";

function App() {
	const { toast } = useToast();

	const [loading, setLoading] = useState(false);
	const [settings, setSettings] = useState(null);
	const [status, setStatus] = useState(null);

	const displayToast = (message: string) => {
		toast({
			title: "Unable to fetch device data.",
			description: message,
			duration: 5000,
		});
	};

	useEffect(() => {
		const getDeviceData = async () => {
			setLoading(true);
			await fetch("http://192.168.1.100/status")
				.then((res) => {
					res.json().then((data) => {
						console.log("status:", data);
						setStatus(data);
					});
				})
				.catch((error) => {
					setLoading(false);
					displayToast("An error occurred while fetching device data, please try again later.");
				});

			await fetch("http://192.168.1.100/settings")
				.then((res) => {
					res.json().then((data) => {
						console.log("settings:", data);
						setSettings(data);
					});
				})
				.catch((error) => {
					setLoading(false);
					displayToast("An error occurred while fetching device data, please try again later.");
				});

			setLoading(false);
		};

		getDeviceData();
	}, []);

	return <>{loading ? <p>loading device data...</p> : status && settings ? <DeviceDataComponent status={status} settings={settings} /> : <p>no data</p>}</>;
}

export default App;
