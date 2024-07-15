/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import {
	ChatHistory,
	ChatModelService,
	ChatModelType,
	MessageContent,
	PopUpControls,
	useAgent,
	useAgentExecutor,
	useChat,
	useChatSettings,
	UserMessageInput,
} from '@automattic/big-sky-agents';
import withChat from './withChat';

const MinimalDemoUI = ({ apiKey }) => {
	useChatSettings({
		apiKey,
		feature: 'big-sky',
		service: ChatModelService.OPENAI,
		model: ChatModelType.GPT_4O,
	});
	useAgent(MinimalAgent);
	useAgentExecutor();

	const { assistantMessage } = useChat();

	console.warn('assistantMessage', assistantMessage);

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

const MinimalAgent = {
	id: 'tiny',
	name: 'Conversation Bot',
	instructions:
		'Will talk about anything but always brings the topic back to the early 1980s show, Knight Rider starring David Hasselhoff. Reference specific quotes and episodes where possible.',
	onStart: (invoke) => {
		invoke.agentSay('Hello, I am a conversation bot.');
	},
};

export default withChat(MinimalDemoUI);
