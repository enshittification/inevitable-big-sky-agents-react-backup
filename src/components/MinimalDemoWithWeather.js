/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import {
	ChatHistory,
	MessageContent,
	PopUpControls,
	useAgent,
	useAgentExecutor,
	useChat,
	UserMessageInput,
} from '@automattic/big-sky-agents';
import withDemoChat from './withDemoChat';

const MinimalDemoUI = () => {
	useAgent(MinimalAgent);
	useAgentExecutor();
	const { assistantMessage } = useChat();

	return (
		<>
			{assistantMessage && (
				<>
					<MessageContent content={assistantMessage} />
					<UserMessageInput />
				</>
			)}
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
		currentLocation: 'Oslo, Norway',
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

const MinimalAgent = {
	id: 'tiny',
	name: 'Conversation Bot',
	toolkits: [GetWeatherToolkit],
	instructions: (context) =>
		`Will talk about anything but always brings the topic back to the early 1980s show Knight Rider starring David Hasselhoff. Reference specific quotes and episodes where possible. The current location is ${context.currentLocation}`,
	onStart: (invoke) => {
		invoke.agentSay('Hello, I am a conversation bot.');
	},
};

export default withDemoChat(MinimalDemoUI);
