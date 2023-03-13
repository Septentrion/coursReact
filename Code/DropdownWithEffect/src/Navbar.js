import "./styles.css";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);

  /*
   * On modifie une partie du DOM extérieure au composant
   * --> effet de bord
   */
  useEffect(() => {
      document.title = `Current state value: ${dropdown}`;
    }, [dropdown]);

  return (
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>
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
