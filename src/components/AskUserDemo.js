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
	MessageContent,
	PopUpControls,
	useAgent,
	useAgentExecutor,
	useAskUserToolkit,
	useChat,
	UserMessageInput,
} from '@automattic/big-sky-agents';
import withDemoChat from './withDemoChat';

const AskUserDemoUI = () => {
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

export default withDemoChat(AskUserDemoUI);
