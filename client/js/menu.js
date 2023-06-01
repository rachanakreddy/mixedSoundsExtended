const menuButton = document.getElementById("menuButton");
const menuIcon = document.getElementById("menuIcon");
const navbar = document.getElementById("navbar");
const logooutButton = document.getElementById("logout");

const toggleMenu = () => {
  if (navbar.className == "invisible") {
    navbar.className = "visible";
    menuIcon.setAttribute("src", "images/hamburgerIconDark.png");
  }
  else {
    navbar.className = "invisible";
    menuIcon.setAttribute("src", "images/hamburgerIconLight.png");
  }
}

const logout = async () => {

  const res = await fetch('/logout', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
  });

  const status = res.status;

  if (status !== 200) {
      alert("something went wrong!");
  } else {

      const result = res.json();
      const data = await result;

      const { redirectUrl } = data;

      window.location.href = redirectUrl;

  }

}

menuButton.addEventListener("click", toggleMenu);
logooutButton.addEventListener("click", logout);