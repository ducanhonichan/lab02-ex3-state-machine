
export const STATUS = Object.freeze({
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
});

export function createInitialState() {
  return {
    status: STATUS.IDLE
  };
}

export function createLoadingState() {
  return {
    status: STATUS.LOADING
  };
}

export function createSuccessState(data) {
  return {
    status: STATUS.SUCCESS,
    data
  };
}

export function createErrorState(error) {
  return {
    status: STATUS.ERROR,
    error: String(error)
  };
}

