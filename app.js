
import {
  STATUS,
  createInitialState,
  createLoadingState,
  createSuccessState,
  createErrorState
} from './state-machine.js';

const feed = document.getElementById('feed');

let state = createInitialState();
let requestId = 0;

// Mock API: simulate an asynchronous data request
function fetchFeed() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate an occasional network error
      if (Math.random() < 0.3) {
        reject(
          new Error('Unable to connect to the server. Please try again.')
        );
        return;
      }

      resolve([
        { id: 1, title: 'Review React Architecture' },
        { id: 2, title: 'Understand Virtual DOM' },
        { id: 3, title: 'Implement State Machines' }
      ]);
    }, 2000);
  });
}

function setState(nextState) {
  state = nextState;
  render();
}

// Prevent stale requests from overwriting newer results
async function loadData() {
  const currentRequest = ++requestId;

  setState(createLoadingState());

  try {
    const items = await fetchFeed();

    if (currentRequest !== requestId) return;

    setState(createSuccessState(items));
  } catch (err) {
    if (currentRequest !== requestId) return;

    setState(
      createErrorState(
        err instanceof Error ? err.message : 'Unable to load data.'
      )
    );
  }
}

function render() {
  feed.replaceChildren();

  switch (state.status) {
    case STATUS.IDLE:
      renderIdle();
      break;

    case STATUS.LOADING:
      renderLoading();
      break;

    case STATUS.SUCCESS:
      renderSuccess();
      break;

    case STATUS.ERROR:
      renderError();
      break;
  }
}

function renderIdle() {
  const message = document.createElement('p');
  message.textContent = 'Ready to load data.';

  const button = document.createElement('button');
  button.textContent = 'Load Data';
  button.addEventListener('click', loadData);

  feed.append(message, button);
}

function renderLoading() {
  const skeleton = document.createElement('div');

  skeleton.innerHTML = `
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-line"></div>
    <div class="skeleton skeleton-line"></div>
    <div class="skeleton skeleton-line short"></div>
  `;

  skeleton.setAttribute('role', 'status');
  skeleton.setAttribute('aria-label', 'Loading data');

  feed.appendChild(skeleton);
}

function renderSuccess() {
  const heading = document.createElement('h2');
  heading.textContent = 'Data loaded successfully';

  const list = document.createElement('ul');

  state.data.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.title;
    list.appendChild(li);
  });

  feed.append(heading, list);
}

function renderError() {
  const message = document.createElement('p');
  message.textContent = `Error: ${state.error}`;

  const retryButton = document.createElement('button');
  retryButton.textContent = 'Retry Connection';
  retryButton.addEventListener('click', loadData);

  feed.append(message, retryButton);
}

render();
