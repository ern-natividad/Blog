// Dummy blog post data
const posts = [
    {
      id: 1,
      title: 'Top Movers April 2025',
      topic: 'Trading',
      imageClass: 'placeholder1',
      time: '5 min',
    },
    {
      id: 2,
      title: 'Introducing: Native BTC Swaps in the DeFi Wallet',
      topic: 'Product Updates',
      imageClass: 'placeholder2',
      time: '2 min',
    },
    {
      id: 3,
      title: 'Q1 2025: A Mixed Start for Crypto',
      topic: 'Industry News',
      imageClass: 'placeholder3',
      time: '5 min',
    },
    {
      id: 4,
      title: 'Introducing: Multichain Withdrawals',
      topic: 'Product Updates',
      imageClass: 'placeholder1',
      time: '2 min',
    },
    {
      id: 5,
      title: 'Nigerian Users: Claim Your Free TRX!',
      topic: 'Regulations',
      imageClass: 'placeholder2',
      time: '2 min',
    },
    {
      id: 6,
      title: 'Buy, Trade, and Hold VIRTUAL and AI16Z',
      topic: 'Company News',
      imageClass: 'placeholder3',
      time: '2 min',
    },
    {
      id: 7,
      title: 'Buy Crypto with Naira',
      topic: 'Trading',
      imageClass: 'placeholder1',
      time: '3 min',
    },
    {
      id: 8,
      title: 'Product Highlights: February 2025',
      topic: 'Product Updates',
      imageClass: 'placeholder2',
      time: '3 min',
    },
    {
      id: 9,
      title: 'Top Movers February 2025',
      topic: 'Trading',
      imageClass: 'placeholder3',
      time: '7 min',
    },
    {
      id: 10,
      title: 'Blockchain.com Expands Executive Leadership Team...',
      topic: 'Company News',
      imageClass: 'placeholder1',
      time: '5 min',
    },
    {
      id: 11,
      title: 'Buy, Trade, and Hold PUFFER',
      topic: 'Product Updates',
      imageClass: 'placeholder2',
      time: '2 min',
    }
  ];
  
  const postsPerPage = 6;
  let currentPage = 1;
  let activeTopic = 'All';
  let searchTerm = '';
  
  const postsGrid = document.getElementById('postsGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const topicsBtns = document.querySelectorAll('.topic');
  const searchInput = document.getElementById('searchInput');
  
  function filterPosts() {
    let filtered = posts.filter(post => {
      const matchTopic = activeTopic === 'All' || post.topic === activeTopic;
      const matchSearch = searchTerm === '' || post.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTopic && matchSearch;
    });
    return filtered;
  }
  
  function renderPosts() {
    const filtered = filterPosts();
    const from = 0;
    const to = currentPage * postsPerPage;
    const visible = filtered.slice(from, to);
    postsGrid.innerHTML = visible.map(post => `
      <div class="post-card">
        <div class="post-image ${post.imageClass}"></div>
        <div class="card-title">${post.title}</div>
        <div class="card-meta">${post.time}</div>
      </div>
    `).join('');
    loadMoreBtn.style.display = filtered.length > visible.length ? 'block' : 'none';
  }
  
  topicsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      topicsBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTopic = btn.getAttribute('data-topic');
      currentPage = 1;
      renderPosts();
    });
  });
  
  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    currentPage = 1;
    renderPosts();
  });
  
  loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    renderPosts();
  });
  
  // Init
  renderPosts();
  