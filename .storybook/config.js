import { configure } from '@kadira/storybook';
import fonts from 'google-fonts';

function loadStories() {
  require('../stories');
  fonts.add({
    'Rajdhani': ['500', '700'],
    'Raleway': ['300','300i','500','500i','700']
  })
}

configure(loadStories, module);
