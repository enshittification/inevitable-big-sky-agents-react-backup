import { Panel, TabPanel } from '@wordpress/components';
import WeatherDemo from './components/WeatherDemo';
import SiteSpecDemo from './components/SiteSpecDemo';
import MinimalDemo from './components/MinimalDemo';
import './App.scss';

const tabs = [
	{
		name: 'minimal-demo',
		title: 'Minimal Demo',
	},
	{
		name: 'weather-demo',
		title: 'Weather Demo',
	},
	{
		name: 'site-spec',
		title: 'Site Spec Demo',
	},
];
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

function App() {
	return (
		<Panel className="App">
			<TabPanel tabs={tabs}>
				{({ name }) => (
					<div>
						{name === 'minimal-demo' && (
							<MinimalDemo apiKey={OPENAI_API_KEY} />
						)}
						{name === 'weather-demo' && (
							<WeatherDemo apiKey={OPENAI_API_KEY} />
						)}
						{name === 'site-spec' && (
							<SiteSpecDemo apiKey={OPENAI_API_KEY} />
						)}
					</div>
				)}
			</TabPanel>
		</Panel>
	);
}

export default App;
