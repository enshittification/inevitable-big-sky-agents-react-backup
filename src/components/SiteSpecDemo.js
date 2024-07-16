import { useEffect } from 'react';
/**
 * Internal dependencies
 */
import {
	AgentUI,
	ChatHistory,
	PopUpControls,
	useAgentExecutor,
	useAgents,
	useAgentsToolkit,
	useChatSettings,
	useGoalToolkit,
	useSiteToolkit,
} from '@automattic/big-sky-agents';

const DemoSiteSpecAgent = ({ apiKey }) => {
	useChatSettings({
		apiKey,
		feature: 'big-sky',
	});
	useAgentsToolkit();
	useSiteToolkit({});
	useGoalToolkit();
	useAgentExecutor();
	const { setActiveAgent } = useAgents();
	// set the initial agent
	useEffect(() => {
		setActiveAgent('WPSiteSpec');
	}, [setActiveAgent]);

	return (
		<>
			<AgentUI />
			<PopUpControls />
			<ChatHistory />
		</>
	);
};

export default DemoSiteSpecAgent;
