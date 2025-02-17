import { registerSW } from "virtual:pwa-register";


const updateSW = registerSW({
	onNeedRefresh() {
	if (confirm("Nouvelle version disponible. Recharger maitenant ?"))
	{
		updateSW(true);
	}
	},
});