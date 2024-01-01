import classes from './App.module.css'
import Header from './components/Header/Header'

const App = () => {
  return (
    <>
      <Header />
      <div className={classes.content}>
        <p></p>
      </div>
    </>
  )
}

export default App