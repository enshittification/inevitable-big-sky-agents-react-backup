/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import {
	AgentsProvider,
	AgentUI,
	AskUserToolkit,
	ChatHistory,
	ChatModelService,
	ChatModelType,
	ChatProvider,
	PopUpControls,
	ToolkitsProvider,
	useAgentExecutor,
} from '@automattic/big-sky-agents';
import withChat from './withChat';

const SingleAssistantDemoUI = () => {
	useAgentExecutor();

	return (
		<>
			<AgentUI />
			<PopUpControls />
			<ChatHistory />
		</>
	);
};

const GetWeatherTool = {
	name: 'getWeather',
	description: 'Get the weather for a location',
	parameters: {
		type: 'object',
		properties: {
			location: {
				type: 'string',
			},
		},
		required: ['location'],
	},
};

const GetWeatherToolkit = {
	name: 'weather',
	context: {
		exampleValue: 'foo',
	},
	tools: [GetWeatherTool],
	callbacks: {
		getWeather: async ({ location }) => {
			const response = await fetch(
				`https://wttr.in/${location}?format=%C+%t`
			);
			const text = await response.text();
			return text;
		},
	},
};

const WeatherAgent = {
	id: 'weatherbot',
	name: 'WeatherBot',
	description: 'Looks up the weather for you',
	instructions: 'You are a helpful weather bot',
	toolkits: [AskUserToolkit.name, GetWeatherToolkit.name],
	onStart: (invoke) => {
		invoke.askUser({
			question: 'What location would you like the weather for?',
			choices: [
				'Boston, MA',
				'New York, NY',
				'San Francisco, CA',
				'Compare the weather in London and Melbourne',
			],
		});
	},
};

const DemoWeatherAgent = ({ apiKey }) => {
	return (
		<ToolkitsProvider toolkits={[GetWeatherToolkit, AskUserToolkit]}>
			<AgentsProvider activeAgentId="weatherbot" agents={[WeatherAgent]}>
				<ChatProvider
					service={ChatModelService.OPENAI}
					model={ChatModelType.GPT_4O}
					apiKey={apiKey}
					feature={'big-sky'}
					assistantEnabled={false}
				>
					<SingleAssistantDemoUI />
				</ChatProvider>
			</AgentsProvider>
		</ToolkitsProvider>
	);
};

export default withChat(DemoWeatherAgent);
