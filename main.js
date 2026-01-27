

const btn = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-links")

btn.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  
})


//for reference, delete when done
/* Hamburger Button - hidden by default */
// .hamburger {
//   display: none;
//   cursor: pointer;
//   background: none;
//   border: none;
// }
// .hamburger span {
//   display: block;
//   width: 25px;
//   height: 3px;
//   background: #0b0720;
//   margin: 5px;
// }

// /* Mobile View (under 768px) */
// @media (max-width: 768px) {
//   .hamburger {
//     display: block;
//   }
//   .nav-links {
//     display: none; /* Hide links initially */
//     flex-direction: column;
//     width: 100%;
//     text-align: center;
//     padding-top: 10px;
//   }
