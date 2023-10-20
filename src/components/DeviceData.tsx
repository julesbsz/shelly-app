// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { useEffect } from "react";

function DeviceDataComponent({ status, settings }) {
	useEffect(() => {
		console.log("status:", status);
		console.log("settings:", settings);
	}, [status, settings]);

	return (
		<Card className="justify-start w-1/4">
			<CardHeader>
				<CardTitle>Device Status</CardTitle>
				<CardDescription>{settings["device"]["hostname"]}</CardDescription>
			</CardHeader>
			<CardContent>
				<Switch value={status["power"]} />
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
}

export default DeviceDataComponent;
