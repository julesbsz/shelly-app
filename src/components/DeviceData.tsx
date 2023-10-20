// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { useEffect } from "react";

function DeviceDataComponent({ data }) {
	useEffect(() => {
		console.log("data (component):", data);
		console.log(data["data"]["device_status"]["relays"][0]["ison"]);
	}, [data]);

	const handleSwitchChange = (e) => {
		if (e) {
			console.log("switch on");
			fetch("https://shelly-86-eu.shelly.cloud/device/relay/control?channel=0&turn=on&id=80646F827174&auth_key=MWRmYzM2dWlkE62C6C4C76F817CE0A3D2902F5B5D4C115E49B28CF8539114D9246505DE5D368D560D06020A92480").then((res) => {
				res.json().then((data) => {
					console.log("data:", data);
					if (!data["isok"]) {
						console.log("unable to switch on");
						// turn switch off
					}
				});
			});
		} else {
			console.log("switch off");
			fetch("https://shelly-86-eu.shelly.cloud/device/relay/control?channel=0&turn=off&id=80646F827174&auth_key=MWRmYzM2dWlkE62C6C4C76F817CE0A3D2902F5B5D4C115E49B28CF8539114D9246505DE5D368D560D06020A92480").then((res) => {
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
				<Switch value={data["data"]["device_status"]["relays"][0]["ison"]} className="mb-5" onCheckedChange={handleSwitchChange} />
				<p>temperature: {data["data"]["device_status"]["temperature"]}</p>
			</CardContent>
		</Card>
	);
}

export default DeviceDataComponent;
