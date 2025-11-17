const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loader = document.getElementById('loader');
const resultCard = document.getElementById('result-card');
const resultContent = document.getElementById('result-content');


function getProfileData(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then((raw) => {
            // if (!raw.ok) throw new Error("User not found.");
            return raw.json();
        });
}

getProfileData("octocat").then((data) => {
    console.log(data);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById("search-input").value.trim();
    if (!username) return alert("Enter a username!");

    loader.classList.remove('hidden');
    resultCard.classList.add('hidden');

    try {
        const data = await getProfileData(username);

        setTimeout(() => {
            loader.classList.add('hidden');
            resultCard.classList.remove('hidden');
            renderResult(data);
        }, 1500);

    } catch (err) {
        loader.classList.add('hidden');
        alert(err.message);
    }
});



function renderResult(data) {
    resultContent.innerHTML = `
        <div class="flex flex-col sm:flex-row gap-8 items-center">
          <img src="${data.avatar_url}" class="w-36 h-36 rounded-2xl shadow-xl border border-white/20 object-cover" />
          <div>
            <h2 class="text-3xl font-bold">${data.name}</h2>
            <p class="text-indigo-300 mt-1 text-sm">@${data.login}</p>
            <p class="mt-4 text-gray-300 max-w-lg">${data.bio}</p>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6 mt-10">
          <div class="p-5 bg-white/5 border border-white/10 rounded-2xl text-center">
            <p class="text-gray-400 text-sm">Repositories</p>
            <h3 class="text-2xl font-bold">${data.public_repos}</h3>
          </div>
          <div class="p-5 bg-white/5 border border-white/10 rounded-2xl text-center">
            <p class="text-gray-400 text-sm">Followers</p>
            <h3 class="text-2xl font-bold">${data.followers}</h3>
          </div>
          <div class="p-5 bg-white/5 border border-white/10 rounded-2xl text-center">
            <p class="text-gray-400 text-sm">Following</p>
            <h3 class="text-2xl font-bold">${data.following}</h3>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-6 mt-10 text-gray-300 text-sm">
          <p><span class="font-semibold text-white">Location:</span> ${data.location || '—'}</p>
          <p><span class="font-semibold text-white">Company:</span> ${data.company || '—'}</p>
          <p><span class="font-semibold text-white">Website:</span> ${data.blog || '—'}</p>
          <p><span class="font-semibold text-white">Twitter:</span> ${data.twitter_username || '—'}</p>
        </div>`;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    loader.classList.remove('hidden');
    resultCard.classList.add('hidden');

    setTimeout(() => {
        loader.classList.add('hidden');
        resultCard.classList.remove('hidden');
        renderResult(data);
    }, 1500);
});




