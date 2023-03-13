import "./styles.css";
import { useState , useEffect, useRef} from "react";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);

  /*
   * Définition d'une référence à un élément du DOM
   */
  const subListRef = useRef(null);

  /*
   * Lorsque la valeurde `dropdown` est modifiée, useEffect est exécutée
   * Ici on installe un écouteur d'événement sur le document
   */
   useEffect(() => {
     const handler = (event) => {
       if (dropdown && ref.current && !ref.current.contains(event.target)) {
         setDropdown(false);
       }
     };
     document.addEventListener("mousedown", handler);

     /*
      * useEffect étant exécuté à chaque modification,
      * il faut (éventuellment) — juste auparavant — annuler ce qui restait du cycle précédent.
      * Ici, par exemple, on ne souhaite pas accumuler les écouteurs.
      * On désactive le précedent. 
      */
     return () => {
       document.removeEventListener("mousedown", handler);
     };

   }, [dropdown]);

  return (
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li ref={ref}>
          <button onClick={() => setDropdown((prev) => !prev)}>
            Services <span>&#8595;</span>
          </button>
          {dropdown && (
            <ul>
              <li>Design</li>
              <li>Development</li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
