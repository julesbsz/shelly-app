// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { useEffect, useState } from "react";

function DeviceDataComponent({ data }) {
	const [status, setStatus] = useState(false);

	useEffect(() => {
		console.log("data (component):", data);
		console.log("state:", data["data"]["device_status"]["relays"][0]["ison"]);
		setStatus(data["data"]["device_status"]["relays"][0]["ison"]);
	}, [data]);

	const handleSwitchChange = () => {
		setStatus(!status);

		if (status) {
			console.log("switching on");
			fetch("https://shelly-77-eu.shelly.cloud/device/relay/control?channel=0&turn=on&id=4022d88e30e8&auth_key=MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73").then((res) => {
				res.json().then((data) => {
					console.log("data:", data);
					if (!data["isok"]) {
						console.log("unable to switch on");
					}
				});
			});
		} else {
			console.log("switching off");
			fetch("https://shelly-77-eu.shelly.cloud/device/relay/control?channel=0&turn=off&id=4022d88e30e8&auth_key=MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73").then((res) => {
				res.json().then((data) => {
					console.log("data:", data);
				});
			});
		}
	};

	return (
		<Card className="justify-start w-96">
			<CardHeader>
				<CardTitle>Device Status</CardTitle>
				<CardDescription>id: {data["data"]["device_status"]["mac"]}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Status: {status ? "on" : "off"}</p>
				<p>temperature: {data["data"]["device_status"]["temperature"]}</p>
			</CardContent>
			<CardFooter>
				<button onClick={handleSwitchChange}>switch {status ? "off" : "on"}</button>
			</CardFooter>
		</Card>
	);
}

export default DeviceDataComponent;
