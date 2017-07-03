import rx from 'resplendence';

const Sheet = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 3em;
`

export default Sheet;
