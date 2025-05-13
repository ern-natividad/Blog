// API endpoints
const API_BASE_URL = '/api';
const ENDPOINTS = {
    POSTS: `${API_BASE_URL}/posts`,
    POPULAR_POSTS: `${API_BASE_URL}/posts/popular`,
    CATEGORIES: `${API_BASE_URL}/categories`,
    ARTICLE: `${API_BASE_URL}/posts/article`,
    LIKE: `${API_BASE_URL}/posts/like`,
    COMMENT: `${API_BASE_URL}/posts/comment`
};

// Fetch posts with optional filters
async function fetchPosts(category = null, search = null, page = 1) {
    try {
        let url = `${ENDPOINTS.POSTS}?page=${page}`;
        if (category) url += `&category=${category}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

// Fetch categories
async function loadCategories() {
    try {
        const response = await fetch(ENDPOINTS.CATEGORIES);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error loading categories:', error);
        return [];
    }
}

// Create post card HTML
function createPostCard(post) {
    const date = new Date(post.crated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
        <div class="post-card" data-id="${post.post_id}">
            <img src="${post.cover_url}" alt="${post.post_title}" class="post-image">
            <div class="post-content">
                <h2 class="post-title">${post.post_title}</h2>
                <div class="post-meta">
                    <span class="post-category">${post.category_name}</span>
                    <span class="post-date">${date}</span>
                </div>
                <p class="post-excerpt">${post.post_text.substring(0, 150)}...</p>
                <div class="post-stats">
                    <span class="likes"><i class="fas fa-heart"></i> ${post.likes}</span>
                    <span class="comments"><i class="fas fa-comment"></i> ${post.comments}</span>
                </div>
            </div>
        </div>
    `;
}

// Create popular post list item HTML
function createPopularPostItem(post) {
    const date = new Date(post.crated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
        <li class="popular-post">
            <img src="${post.cover_url}" alt="${post.post_title}" class="popular-post-image">
            <div class="popular-post-content">
                <h3 class="popular-post-title">${post.post_title}</h3>
                <div class="popular-post-meta">
                    <span class="post-category">${post.category_name}</span>
                    <span class="post-date">${date}</span>
                </div>
                <div class="post-stats">
                    <span class="likes"><i class="fas fa-heart"></i> ${post.likes}</span>
                </div>
            </div>
        </li>
    `;
}

// Load and render posts on homepage
async function loadPosts(category = null, search = null) {
    const postsContainer = document.querySelector('.posts-container');
    if (!postsContainer) return;

    const posts = await fetchPosts(category, search);
    postsContainer.innerHTML = posts.map(createPostCard).join('');

    // Add click event listeners to post cards
    document.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', () => {
            const postId = card.dataset.id;
            window.location.href = `article.html?id=${postId}`;
        });
    });
}

// Load and render popular posts
async function loadPopularPosts() {
    const popularPostsContainer = document.querySelector('.popular-posts');
    if (!popularPostsContainer) return;

    try {
        const response = await fetch(ENDPOINTS.POPULAR_POSTS);
        const data = await response.json();
        popularPostsContainer.innerHTML = data.data.map(createPopularPostItem).join('');
    } catch (error) {
        console.error('Error loading popular posts:', error);
    }
}

// Load and render categories
async function loadCategoryFilters() {
    const categoryContainer = document.querySelector('.category-filters');
    if (!categoryContainer) return;

    const categories = await loadCategories();
    const categoryHTML = `
        <button class="category-btn active" data-category="">All</button>
        ${categories.map(cat => `
            <button class="category-btn" data-category="${cat.id}">${cat.category}</button>
        `).join('')}
    `;
    categoryContainer.innerHTML = categoryHTML;

    // Add click event listeners to category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadPosts(btn.dataset.category);
        });
    });
}

// Load and render article
async function loadArticle() {
    const articleContainer = document.querySelector('.article-container');
    if (!articleContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (!postId) {
        articleContainer.innerHTML = '<p>Article not found</p>';
        return;
    }

    try {
        const response = await fetch(`${ENDPOINTS.ARTICLE}?id=${postId}`);
        const data = await response.json();
        const post = data.data;

        if (!post) {
            articleContainer.innerHTML = '<p>Article not found</p>';
            return;
        }

        const date = new Date(post.crated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        articleContainer.innerHTML = `
            <article class="article">
                <h1 class="article-title">${post.post_title}</h1>
                <div class="article-meta">
                    <span class="article-category">${post.category_name}</span>
                    <span class="article-date">${date}</span>
                </div>
                <img src="${post.cover_url}" alt="${post.post_title}" class="article-image">
                <div class="article-content">${post.post_text}</div>
                <div class="article-stats">
                    <button class="like-btn" data-post-id="${post.post_id}">
                        <i class="fas fa-heart"></i> <span class="likes-count">${post.likes}</span>
                    </button>
                    <span class="comments-count"><i class="fas fa-comment"></i> ${post.comments}</span>
                </div>
            </article>
            <section class="comments-section">
                <h2>Comments</h2>
                <div class="comments-list">
                    ${post.comments_list.map(comment => `
                        <div class="comment">
                            <div class="comment-header">
                                <span class="comment-author">${comment.user_name}</span>
                                <span class="comment-date">${new Date(comment.crated_at).toLocaleDateString()}</span>
                            </div>
                            <div class="comment-content">${comment.comment}</div>
                        </div>
                    `).join('')}
                </div>
                <form class="comment-form">
                    <textarea placeholder="Write a comment..." required></textarea>
                    <button type="submit">Post Comment</button>
                </form>
            </section>
        `;

        // Add like button functionality
        const likeBtn = articleContainer.querySelector('.like-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', async () => {
                try {
                    const response = await fetch(ENDPOINTS.LIKE, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            post_id: postId,
                            user_id: 1 // TODO: Get actual user ID from session
                        })
                    });
                    const data = await response.json();
                    if (data.status === 'success') {
                        const likesCount = likeBtn.querySelector('.likes-count');
                        const currentLikes = parseInt(likesCount.textContent);
                        likesCount.textContent = data.action === 'liked' ? currentLikes + 1 : currentLikes - 1;
                    }
                } catch (error) {
                    console.error('Error liking post:', error);
                }
            });
        }

        // Add comment form functionality
        const commentForm = articleContainer.querySelector('.comment-form');
        if (commentForm) {
            commentForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const textarea = commentForm.querySelector('textarea');
                const comment = textarea.value.trim();
                
                if (!comment) return;

                try {
                    const response = await fetch(ENDPOINTS.COMMENT, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            post_id: postId,
                            user_id: 1, // TODO: Get actual user ID from session
                            comment: comment
                        })
                    });
                    const data = await response.json();
                    if (data.status === 'success') {
                        const commentsList = articleContainer.querySelector('.comments-list');
                        const newComment = data.data;
                        commentsList.insertAdjacentHTML('afterbegin', `
                            <div class="comment">
                                <div class="comment-header">
                                    <span class="comment-author">${newComment.user_name}</span>
                                    <span class="comment-date">${new Date(newComment.crated_at).toLocaleDateString()}</span>
                                </div>
                                <div class="comment-content">${newComment.comment}</div>
                            </div>
                        `);
                        textarea.value = '';
                    }
                } catch (error) {
                    console.error('Error posting comment:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error loading article:', error);
        articleContainer.innerHTML = '<p>Error loading article</p>';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Load homepage content
    loadPosts();
    loadPopularPosts();
    loadCategoryFilters();

    // Load article page content
    loadArticle();

    // Add search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            loadPosts(null, searchInput.value);
        }, 500));
    }
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
  