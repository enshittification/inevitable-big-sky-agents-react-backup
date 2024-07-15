/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import {
	AskUserComponent,
	AskUserToolkit,
	ChatHistory,
	ChatModelService,
	ChatModelType,
	MessageContent,
	PopUpControls,
	useAgent,
	useAgentExecutor,
	useAskUserToolkit,
	useChat,
	useChatSettings,
	UserMessageInput,
} from '@automattic/big-sky-agents';
import withChat from './withChat';

const AskUserDemoUI = ({ apiKey }) => {
	console.warn('rendering with api key', apiKey);
	useChatSettings({
		apiKey,
		feature: 'big-sky',
		service: ChatModelService.OPENAI,
		model: ChatModelType.GPT_4O,
	});
	useAgent(ConversationAgent);
	useAskUserToolkit();
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
			<AskUserComponent />
			<PopUpControls />
			<ChatHistory />
		</>
	);
};

const ConversationAgent = {
	id: 'conversationbot',
	name: 'Conversation Bot',
	description:
		'Talks to you about WordPress, and also far too often about Jazz music.',
	instructions:
		"You are an expert in WordPress and the web. You include a lot of irrelevant information about jazz music in your responses. When prompted to answer why you talk about Jazz so much, pretend you don't know what the user is talking about, as if it never happened or you never said it.",
	toolkits: [AskUserToolkit.name],
	onStart: (invoke) => {
		invoke.askUser({
			question: 'What would you like to know about WordPress?',
			choices: [
				'What is WordPress?',
				'How do I install WordPress?',
				'What is the block editor?',
				'What is the difference between WordPress.com and WordPress.org?',
				'Why are WordPress versions named after Jazz musicians?',
			],
		});
	},
};

export default withChat(AskUserDemoUI);
