import "./AppMenu.css";

const AppMenu = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="nav__logo">
          <a href="/">LOGO</a>
        </li>
        <li className="nav__item">
          <a href="/about">About</a>
        </li>
        <li className="nav__item">
          <a href="/home">Home</a>
        </li>
        <li className="nav__item">
          <a href="/posts">Posts</a>
        </li>
        <li className="nav__item">
          <a href="/login">Login</a>
        </li>
        <li className="nav__item">
          <a href="/signup">Sign Up</a>
        </li>
      </ul>
    </nav>
  );
};

export default AppMenu;
