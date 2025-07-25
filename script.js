//For the progress scroll bar
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.getElementById("scroll-progress-bar").style.width = `${scrollPercent}%`;
});


//For the ScrollSpy
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
        }
    });
}, {
    threshold: 0.6
});

sections.forEach(section => observer.observe(section));

//hamburger functionality
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".navbar ul");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
});


//About section modal functionality

const modal = document.getElementById("addMemberModal");
const openBtn = document.getElementById("addMemberBtn");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => {
    modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});


//animation + transition of hero section
window.addEventListener("DOMContentLoaded", () => {
    const sets = [
        document.getElementById("set-strategize"),
        document.getElementById("set-compete"),
        document.getElementById("set-conquer")
    ];

    const duration = 2000;
    const lineSpacing = 60;
    const originalLine = 3;
    const fadeDuration = 50; // fade time in ms
    let current = 0;

    // Set up layout for each line
    function setupLines(set) {
        const filledLines = set.querySelectorAll(".hero-text.filled h1");
        const outlineLines = set.querySelectorAll(".hero-text.outline h1");

        filledLines.forEach((h1, idx) => {
            const lineNum = idx + 1;
            const offset = (lineNum - originalLine) * lineSpacing;

            h1.style.position = "absolute";
            h1.style.top = `calc(50% + ${offset}px)`;
            h1.style.left = "50%";
            h1.style.transform = "translateX(-50%) translateY(0)";
            h1.style.opacity = lineNum === originalLine ? "1" : "0";
            h1.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });

        outlineLines.forEach((h1, idx) => {
            const lineNum = idx + 1;
            const offset = (lineNum - originalLine) * lineSpacing;

            h1.style.position = "absolute";
            h1.style.top = `calc(50% + ${offset}px)`;
            h1.style.left = "50%";
            h1.style.transform = "translateX(-50%) translateY(0)";
            h1.style.opacity = lineNum === originalLine ? "1" : "0";
            h1.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });

        set.style.opacity = "0";
        set.style.transition = `opacity ${fadeDuration}ms ease`;
        set.style.display = "none";
    }

    // Initial setup
    sets.forEach(set => setupLines(set));

    // Animate clone lines
    function animateWord(set) {
        const filledLines = set.querySelectorAll(".hero-text.filled h1");
        const outlineLines = set.querySelectorAll(".hero-text.outline h1");

        filledLines.forEach((h1, idx) => {
            const lineNum = idx + 1;
            if (lineNum !== originalLine) {
                const offset = (lineNum - originalLine) * lineSpacing;
                h1.style.opacity = "1";
                h1.style.transform = `translateX(-50%) translateY(${offset}px)`;
            }
        });

        outlineLines.forEach((h1, idx) => {
            const lineNum = idx + 1;
            if (lineNum !== originalLine) {
                const offset = (lineNum - originalLine) * lineSpacing;
                h1.style.opacity = "0.6";
                h1.style.transform = `translateX(-50%) translateY(${offset}px)`;
            }
        });

        setTimeout(() => {
            filledLines.forEach((h1, idx) => {
                if (idx + 1 !== originalLine) {
                    h1.style.opacity = "0";
                    h1.style.transform = `translateX(-50%) translateY(0)`;
                }
        });

        outlineLines.forEach((h1, idx) => {
            if (idx + 1 !== originalLine) {
                h1.style.opacity = "0";
                h1.style.transform = `translateX(-50%) translateY(0)`;
            }
        });
        }, duration);
    }

    // Fade logic
    function fadeToNextWord() {
        const currentSet = sets[current];
        const nextIndex = (current + 1) % sets.length;
        const nextSet = sets[nextIndex];

        // Fade out current
        currentSet.style.opacity = "0";

        setTimeout(() => {
        // Hide current
        // Show next
            nextSet.style.display = "block";
            nextSet.style.opacity = "0";
            void nextSet.offsetWidth;
            nextSet.style.opacity = "1";
    

        // Animate next set's clone lines
        animateWord(nextSet);

        // Update index
        current = nextIndex;
        }, fadeDuration);
    }

    // Initial show
    sets[current].style.display = "block";
    sets[current].style.opacity = "1";
    animateWord(sets[current]);

    // Loop with fade transition
    setInterval(() => {
        fadeToNextWord();
    }, duration + 1000);
});




// ===== Carousel Element References =====
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.carousel-card');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

// ===== Carousel State Variables =====
let currentIndex = 0;
let autoSlide = true;
let autoSlideInterval;
let idleTimeout;
let autoSlideActive = true;
let userManuallyClicked = false;

// ===== Update Carousel Position =====
function updateCarousel() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
}

// ===== Auto Slide Logic =====
function startAutoSlide() {
    stopAutoSlide(); // Prevent multiple intervals
    autoSlide = true;
    autoSlideInterval = setInterval(() => {
        if (autoSlide) {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        }
    }, 5000); // Slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlide = false;
}

// ===== Idle Timer Logic =====
function resetIdleTimer() {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
        if (!userManuallyClicked && autoSlideActive) {
            startAutoSlide(); // Resume after 15s of inactivity if allowed
        }
    }, 15000); // 15 seconds
}

// ===== Manual Navigation Handling =====
function handleManualSlide(direction) {
    stopAutoSlide();
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % cards.length;
    } else {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }
    updateCarousel();
    resetIdleTimer();
}


// ===== Event Listeners for Buttons =====
nextBtn.addEventListener('click', () => handleManualSlide('next'));
prevBtn.addEventListener('click', () => handleManualSlide('prev'));



//customised event section
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("eventModal");
    const closeModal = document.getElementById("closeEventModal");
    const modalTitle = document.getElementById("modalEventTitle");
    const modalDescription = document.getElementById("modalEventDescription");
    const modalButtons = document.getElementById("modalEventButtons");

    const readMoreButtons = document.querySelectorAll(".read-more-btn");

    readMoreButtons.forEach(button => {
        button.addEventListener("click", () => {
        // Set title
        const title = button.getAttribute("data-title") || "Event Title";
        modalTitle.textContent = title;

        // Set paragraph content, split by double newline
        const description = button.getAttribute("data-description") || "Event details coming soon.";
        const paragraphs = description.split('\n\n');
        modalDescription.innerHTML = '';
        paragraphs.forEach(p => {
            const para = document.createElement("p");
            para.textContent = p.trim();
            modalDescription.appendChild(para);
        });

        // Create action buttons (Join link, Rulebook, etc.)
        modalButtons.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
            const text = button.getAttribute(`data-button${i}-text`);
            const link = button.getAttribute(`data-button${i}-link`);

            if (text && link) {
            const actionBtn = document.createElement("a");
            actionBtn.href = link;
            actionBtn.target = "_blank";
            actionBtn.className = "gold-button";
            actionBtn.textContent = text;
            modalButtons.appendChild(actionBtn);
            }
        }

        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
    });

    window.addEventListener("click", e => {
        if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
        }
    });
});


// ===== Swipe Gesture Support for Mobile =====
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const swipeThreshold = 50; // Minimum swipe distance to trigger

  if (touchEndX < touchStartX - swipeThreshold) {
    // Swiped left
    handleManualSlide('next');
  } else if (touchEndX > touchStartX + swipeThreshold) {
    // Swiped right
    handleManualSlide('prev');
  }
}



/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/



// ==== Results Section Carousel (Smooth Scroll) ====
const resultsTrack = document.querySelector('.results-track');
const resultCard = document.querySelector('.result-card');
const resultsPrevBtn = document.querySelector('.results-btn.prev');
const resultsNextBtn = document.querySelector('.results-btn.next');

// Calculate scroll amount per click (3 cards per view)
const scrollAmount = resultCard.offsetWidth + 32; // card width + gap

resultsNextBtn.addEventListener('click', () => {
    resultsTrack.scrollBy({
        left: scrollAmount * 3, // scroll by 3 cards
        behavior: 'smooth'
    });
});

resultsPrevBtn.addEventListener('click', () => {
    resultsTrack.scrollBy({
        left: -scrollAmount * 3,
        behavior: 'smooth'
    });
});



/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/


//Modal DOM references

const winnerModal = document.getElementById("winnerModal");
const customDetailModal = document.getElementById("customDetailModal");

const customDetailTitle = document.getElementById('custom-detail-title');
const customDetailDesc = document.getElementById('custom-detail-description');
const customDetailButtons = document.getElementById('custom-detail-buttons');

// Close all modals
function closeModals() {
  [winnerModal, customDetailModal].forEach(modal => {
        if (modal) {
            modal.classList.remove('active');
            modal.classList.add('hidden');
        }
    });
}

// Attach close button listeners
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-modal')) {
        closeModals();
    }
});

// ----------------------
// Winner Modal Logic
// ----------------------
document.querySelectorAll('.open-winner-modal-btn').forEach(button => {
    button.addEventListener('click', () => {
        const eventName = button.dataset.event || "Unknown Event";
        const eventType = button.dataset.eventType || "individual";

        const modalContent = winnerModal.querySelector('.modal-content');
        modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <h3>${eventName}</h3>
        `;

        if (eventType === "individual") {
        const boys = [button.dataset.boy1, button.dataset.boy2, button.dataset.boy3].filter(Boolean);
        const girls = [button.dataset.girl1, button.dataset.girl2, button.dataset.girl3].filter(Boolean);
        if (boys.length) modalContent.innerHTML += generatePodiumSection("Boys Podium", boys);
        if (girls.length) modalContent.innerHTML += generatePodiumSection("Girls Podium", girls);
        } else if (eventType === "team") {
        const position = button.dataset.position || "N/A";
        const members = button.dataset.members || "No data";
        modalContent.innerHTML += `
            <div class="modal-section">
            <p><strong>Team Position:</strong> ${position}</p>
            <p><strong>Team Members:</strong> ${members}</p>
            </div>
        `;
        } else {
        const winner = button.dataset.winner || "Winner not specified";
        const team = button.dataset.team || "N/A";
        modalContent.innerHTML += `
            <p><strong>Winner:</strong> ${winner}</p>
            <p><strong>Team:</strong> ${team}</p>
        `;
        }

        winnerModal.classList.remove("hidden");
        winnerModal.classList.add("active");
    });
});

// Podium generator
function generatePodiumSection(title, names = []) {
    return `
        <div class="modal-section">
        <div class="modal-section-title">${title}</div>
        <div class="modal-podium">
            ${names.map((name, index) => `
            <div class="podium-place podium-${index + 1}">
                <span>${name}</span>
            </div>
            `).join('')}
        </div>
        </div>
    `;
}

//Detail Modal Logic
document.querySelectorAll('.open-detail-modal-btn').forEach(button => {
    button.addEventListener('click', () => {
        const title = button.dataset.title || "Event Details";
        const description = button.dataset.description || "No description provided.";

        customDetailTitle.textContent = title;

        const paragraphs = description.split('\n\n');
        customDetailDesc.innerHTML = '';
        paragraphs.forEach(p => {
        const para = document.createElement('p');
        para.textContent = p.trim();
        customDetailDesc.appendChild(para);
    });

    customDetailButtons.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
        const text = button.dataset[`button${i}Text`];
        const link = button.dataset[`button${i}Link`];
        if (text && link) {
            const a = document.createElement('a');
            a.href = link;
            a.target = '_blank';
            a.textContent = text;
            a.className = 'view-certificate';
            customDetailButtons.appendChild(a);
      }
    }

    customDetailModal.classList.remove('hidden');
    customDetailModal.classList.add('active');
  });
});


/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/





//Timeline expansion
const expandBtn = document.getElementById("expandTimelineBtn");
const collapseBtn = document.getElementById("collapseTimelineBtn");
const hiddenTimeline = document.querySelector(".more-timeline");

expandBtn.addEventListener("click", () => {
    hiddenTimeline.classList.remove("hidden");          // Show hidden timeline
    expandBtn.classList.add("hidden");                  // Hide "Show Full Timeline" button
    collapseBtn.classList.remove("hidden");             // Show "Collapse" button
});

collapseBtn.addEventListener("click", () => {
    hiddenTimeline.classList.add("hidden");             // Hide timeline again
    collapseBtn.classList.add("hidden");                // Hide "Collapse" button
    expandBtn.classList.remove("hidden"); 
                
});                                                     // Re-show "Show Full Timeline" button


document.getElementById("timeline").scrollIntoView({ behavior: "smooth" });




const timelineItems = document.querySelectorAll('.timeline-item');

    function activateCenterItem() {
        const viewportCenter = window.innerHeight / 2;
        let closestItem = null;
        let minDistance = Infinity;

        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - itemCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestItem = item;
            }
    });

    // Remove .active from all
    timelineItems.forEach(item => item.classList.remove('active'));

    // Add .active to the closest one
    if (closestItem) {
        closestItem.classList.add('active');
    }
  }

    // Trigger on scroll and on load
    window.addEventListener('scroll', activateCenterItem);
    window.addEventListener('load', activateCenterItem);



// === TEAM SECTION JS with LOOPING + DOT INDICATORS ===

// Get all team slides
const teamSlides = document.querySelectorAll(".team-slide");
const teamNextBtn = document.getElementById("team-next");
const teamPrevBtn = document.getElementById("team-prev");
const teamIndicatorsContainer = document.getElementById("team-indicators"); // Make sure you add <div id="team-indicators"></div> in HTML

let teamCurrentSlide = 0;

// Create indicator dots dynamically
teamSlides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
        teamCurrentSlide = index;
        showTeamSlide(teamCurrentSlide);
    });
    teamIndicatorsContainer.appendChild(dot);
});

// Function to show the correct slide
function showTeamSlide(index) {
    teamSlides.forEach((slide, i) => {
        slide.classList.toggle("active-slide", i === index);
  });

    const allDots = document.querySelectorAll(".team-indicators .dot");
    allDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

// Looping behavior
teamNextBtn.addEventListener("click", () => {
    teamCurrentSlide = (teamCurrentSlide + 1) % teamSlides.length;
    showTeamSlide(teamCurrentSlide);
});

teamPrevBtn.addEventListener("click", () => {
    teamCurrentSlide =
        (teamCurrentSlide - 1 + teamSlides.length) % teamSlides.length;
    showTeamSlide(teamCurrentSlide);
});

// Initial load
showTeamSlide(teamCurrentSlide);



//for mobile version

document.querySelectorAll('.mobile-team-wrapper').forEach(wrapper => {
    const row = wrapper.querySelector('.team-mobile-row');
    const nextBtn = wrapper.querySelector('.mobile-next');
    const prevBtn = wrapper.querySelector('.mobile-prev');
    
    const cardWidth = row.querySelector('.team-card').offsetWidth + 24; // 24px = gap/margin

    nextBtn.addEventListener('click', () => {
        const maxScroll = row.scrollWidth - row.clientWidth;
        if (row.scrollLeft + cardWidth >= maxScroll) {
        // Loop to beginning
        row.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
        row.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
  });

    prevBtn.addEventListener('click', () => {
        if (row.scrollLeft <= 0) {
        // Loop to end
        row.scrollTo({ left: row.scrollWidth, behavior: 'smooth' });
        } else {
        row.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    });
});

//Back to top Button
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



//scroll to meet the team from about section

document.getElementById("meetTeamBtn").addEventListener("click", function(e) {
  e.preventDefault();

  // On mobile, scroll to the visible section
  if (window.innerWidth <= 768) {
    document.querySelector(".team-mobile-section").scrollIntoView({ behavior: "smooth" });
  } else {
    document.getElementById("team").scrollIntoView({ behavior: "smooth" });
  }
});



// Modal for all members list
document.addEventListener("DOMContentLoaded", () => {
  const membersModal = document.querySelector(".members-list-modal");
  const closeMembersModal = document.getElementById("closeMembersModal");

  // Support both desktop and mobile open buttons
  const openButtons = [
    document.getElementById("openMembersModal"),
    document.getElementById("openMembersModal-mobile"),
  ];

  openButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        membersModal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    }
  });

  // Close modal logic
  closeMembersModal?.addEventListener("click", () => {
    membersModal.style.display = "none";
    document.body.style.overflow = "";
  });

  window.addEventListener("click", (e) => {
    if (e.target === membersModal) {
      membersModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});


// Search bar and sorting inside member list modal
const searchInput = document.getElementById('memberSearchInput');
const sortSelect = document.getElementById('sortMembersSelect');
const membersBody = document.querySelector('.members-list-body');

// Store original entries
const originalMembers = Array.from(membersBody?.children || []);

function filterAndSortMembers() {
  const searchValue = searchInput?.value.toLowerCase() || '';
  const sortValue = sortSelect?.value;

  if (!membersBody) return;

  // Filter
  let filtered = originalMembers.filter(entry =>
    entry.textContent.toLowerCase().includes(searchValue)
  );

  // Sort
  filtered.sort((a, b) => {
    const nameA = a.querySelector('span').textContent.toLowerCase();
    const nameB = b.querySelector('span').textContent.toLowerCase();
    return sortValue === 'az'
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  // Re-render
  membersBody.innerHTML = '';
  filtered.forEach(entry => membersBody.appendChild(entry));
}

// Attach listeners if elements exist
searchInput?.addEventListener('input', filterAndSortMembers);
sortSelect?.addEventListener('change', filterAndSortMembers);
