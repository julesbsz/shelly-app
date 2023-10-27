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
		await fetch("https://shelly-77-eu.shelly.cloud/device/status?id=4022d88e30e8&auth_key=MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73")
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

	useEffect(() => {
		getDeviceData();
	}, []);

	return <>{loading ? <p>loading device data...</p> : data ? <DeviceDataComponent data={data} /> : <p>no data</p>}</>;
}

export default App;
