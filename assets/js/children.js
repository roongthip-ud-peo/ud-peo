/**
 * Template Name: iLanding
 * Template URL: https://bootstrapmade.com/ilanding-bootstrap-landing-page-template/
 * Updated: Nov 12 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

;(function () {
  "use strict"

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */

  function toggleScrolled() {
    const selectBody = document.querySelector("body")
    const selectHeader = document.querySelector("#header")
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled")
  }

  document.addEventListener("scroll", toggleScrolled)
  window.addEventListener("load", toggleScrolled)

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle")

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active")
    mobileNavToggleBtn.classList.toggle("bi-list")
    mobileNavToggleBtn.classList.toggle("bi-x")
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle)
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle()
      }
    })
  })

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault()
      this.parentNode.classList.toggle("active")
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active")
      e.stopImmediatePropagation()
    })
  })

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top")

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active")
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  window.addEventListener("load", toggleScrollTop)
  document.addEventListener("scroll", toggleScrollTop)

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  }
  window.addEventListener("load", aosInit)

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  })

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      )

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config)
      } else {
        new Swiper(swiperElement, config)
      }
    })
  }

  window.addEventListener("load", initSwiper)

  /**
   * Initiate Pure Counter
   */
  new PureCounter()

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active")
      })
    })

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash)
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          })
        }, 100)
      }
    }
  })

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a")

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return
      let section = document.querySelector(navmenulink.hash)
      if (!section) return
      let position = window.scrollY + 200
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"))
        navmenulink.classList.add("active")
      } else {
        navmenulink.classList.remove("active")
      }
    })
  }
  window.addEventListener("load", navmenuScrollspy)
  document.addEventListener("scroll", navmenuScrollspy)
})()

var title_not_found = "ไม่พบข้อมูล"
var desc_not_found = "ไม่พบข้อมูลที่ท่านค้นหา"

function seeDetails(id) {
  // const url = "service-details.html?id=" + id
  // window.open(url, "_blank")

  window.location.href = "service-details.html?id=" + id
}

// Get the ID parameter from the URL
const params = new URLSearchParams(window.location.search)
const id = parseInt(params.get("id"), 10) // Convert to a number

// Fetch data from the JSON file
fetch("assets/json/banner.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    return response.json()
  })
  .then((data) => {
    // Find the service object matching the ID
    const service = data.find((item) => item.id === id)

    if (service) {
      // Update the HTML elements with the data
      document.getElementById("service-img").src = service.image
      document.getElementById("service-title").textContent = service.title
      document.getElementById("service-description").textContent =
        service.description
      document.getElementById("title").innerText = service.title
      document.getElementById("title2").innerText = service.title
    } else {
      // Handle case where ID is not found
      document.getElementById("service-title").textContent = title_not_found
      document.getElementById("service-description").textContent =
        desc_not_found
      document.getElementById("title").innerText = title_not_found
      document.getElementById("title2").innerText = title_not_found
    }
  })
  .catch((error) => {
    console.error("Error loading data:", error)
  })

// Fetch data from the JSON file
fetch("assets/json/banner.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    return response.json()
  })
  .then((data) => {
    const servicesList = document.getElementById("services-list")

    // Clear the existing list before adding new items
    servicesList.innerHTML = ""

    // Loop through the JSON data
    data.forEach((item) => {
      // Create the <a> element
      const link = document.createElement("a")

      // Add 'active' class if the item ID matches the URL parameter
      if (item.id === id) {
        link.classList.add("active")
      }

      // Set the onclick event handler to call seeDetails with the item's id
      link.setAttribute("onclick", `seeDetails(${item.id})`)

      // Create the <i> element for the icon
      const icon = document.createElement("i")
      icon.classList.add("bi", "bi-arrow-right-circle")

      // Create the <span> element for the text
      const text = document.createElement("span")
      text.textContent = item.title // Assuming your JSON has a 'title' field

      // Append the icon and text to the link
      link.appendChild(icon)
      link.appendChild(text)

      // Append the <a> to the services list
      servicesList.appendChild(link)
    })
  })
  .catch((error) => {
    console.error("Error loading data:", error)
  })
