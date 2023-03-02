console.log('Trying to load jspsych');




import {initJsPsych} from '../importable/jspsych/dist/jspsych.js';
import htmlKeyboardResponse from '../importable/jspsych/plugin-html-keyboard-response';

const jsPsych = initJsPsych();

const trial = {
    type: htmlKeyboardResponse,
    stimulus: 'Hello world!',
}

jsPsych.run([trial]);