import { useReducer, useEffect, useRef } from 'react';
import reducer from './stopwatchReducer';

function Stopwatch() {

  /*
   * Etat initial du chronomètre
   */
  const initialState = {
    isRunning: false,
    time: 0
  };


  /*
   * Initialisation du gestionnaire d'état
   */
  const [state, dispatch] = useReducer(reducer, initialState);

  /*
   * On définit une variablelocale initialisée à 0
   */
  const idRef = useRef(0);

  /*
   * On utilise useEffect pour gérer le minuteur
   * avec setInteval
   * àchque modification de la valeur de isRunning
   */
  useEffect(() => {
    if (!state.isRunning) {
      return;
    }
    idRef.current = setInterval(() => dispatch({type: 'tick'}), 1000);

    /*
     * A chaque activation,
     * il faut arrêter le chronomètre précédetn
     */
    return () => {
      clearInterval(idRef.current);
      idRef.current = 0;
    };
  }, [state.isRunning]);

  /*
   * Le code JSX du composant avec les événements
   * Les objets décrivant les actions sont diretement
   * injectés comme argument de la fonction
   */
  return (
    <div>
      {state.time}s
      <button onClick={() => dispatch({ type: 'start' })}>
        Start
      </button>
      <button onClick={() => dispatch({ type: 'stop' })}>
        Stop
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </div>
  );
}
