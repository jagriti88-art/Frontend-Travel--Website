document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute("href").substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Destination Filter
    const filterInput = document.getElementById("filter");
    if (filterInput) {
        filterInput.addEventListener("input", function () {
            let filterValue = filterInput.value.toLowerCase();
            document.querySelectorAll(".destination").forEach(dest => {
                dest.style.display = dest.textContent.toLowerCase().includes(filterValue) ? "block" : "none";
            });
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = newsletterForm.querySelector("input[type='email']").value;
            if (email) {
                alert(`Thank you for subscribing, ${email}!`);
                newsletterForm.reset();
            } else {
                alert("Please enter a valid email.");
            }
        });
    }

    // Fetch Weather (Auto Detect User's Location)
    const weatherElement = document.getElementById("weather");
    if (weatherElement && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
        }, () => {
            weatherElement.innerHTML = "Enable location to get weather updates.";
        });
    }

    function fetchWeather(lat, lon) {
        const apiKey = "your_openweathermap_api_key"; // Replace with your API key
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.main) {
                    weatherElement.innerHTML = `🌡 ${data.main.temp}°C | ${data.weather[0].description}`;
                } else {
                    weatherElement.innerHTML = "Weather data unavailable.";
                }
            })
            .catch(() => {
                weatherElement.innerHTML = "Error fetching weather.";
            });
    }

    // Testimonial Slider
    const testimonials = document.querySelectorAll(".testimonial");
    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonial].style.display = "none";
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.display = "block";
    }

    if (testimonials.length > 1) {
        testimonials.forEach((t, i) => (t.style.display = i === 0 ? "block" : "none"));
        setInterval(showNextTestimonial, 3000);
    }

    // Dark Mode Toggle
    const darkModeToggle = document.createElement("button");
    darkModeToggle.innerHTML = "🌙 Dark Mode";
    darkModeToggle.style.position = "fixed";
    darkModeToggle.style.bottom = "20px";
    darkModeToggle.style.right = "20px";
    darkModeToggle.style.padding = "10px";
    darkModeToggle.style.background = "#333";
    darkModeToggle.style.color = "#fff";
    darkModeToggle.style.border = "none";
    darkModeToggle.style.cursor = "pointer";
    darkModeToggle.style.borderRadius = "5px";
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        darkModeToggle.innerHTML = document.body.classList.contains("dark-mode") ? "☀ Light Mode" : "🌙 Dark Mode";
    });

    // Live Clock Display
    const clockElement = document.createElement("div");
    clockElement.style.position = "fixed";
    clockElement.style.top = "10px";
    clockElement.style.right = "20px";
    clockElement.style.fontSize = "18px";
    clockElement.style.fontWeight = "bold";
    clockElement.style.color = "#333";
    document.body.appendChild(clockElement);

    function updateClock() {
        const now = new Date();
        clockElement.innerHTML = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Contact Form Validation
    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("textarea").value.trim();

            if (!name || !email || !message) {
                event.preventDefault();
                alert("Please fill in all fields before submitting.");
            }
        });
    }

    // Back to Top Button
    const backToTop = document.createElement("button");
    backToTop.innerHTML = "⬆ Top";
    backToTop.style.position = "fixed";
    backToTop.style.bottom = "60px";
    backToTop.style.right = "20px";
    backToTop.style.padding = "10px";
    backToTop.style.background = "#008CBA";
    backToTop.style.color = "#fff";
    backToTop.style.border = "none";
    backToTop.style.cursor = "pointer";
    backToTop.style.borderRadius = "5px";
    backToTop.style.display = "none";
    document.body.appendChild(backToTop);

    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
});
