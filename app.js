const STORAGE_KEYS = {
    USERS: "ma_users_v2",
    CURRENT_USER: "ma_current_user_v2",
    PRODUCTS: "ma_products_v2",
    CART: "ma_cart_v2",
    ORDERS: "ma_orders_v2"
};

const defaultProducts = [
    {
        id: 1,
        name: "Áo Sơ Mi Lụa Tơ Tằm Imperial Ivory",
        categoryId: 1,
        price: 12500000,
        discountPrice: 10800000,
        stock: 15,
        isActive: true,
        hasOrderHistory: true,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Chế tác từ lụa Mulberry hạng 6A với khuy xà cừ tự nhiên khâu tay tỉ mỉ."
    },
    {
        id: 2,
        name: "Bộ Vest Tuxedo Noir Royal Wool",
        categoryId: 2,
        price: 48000000,
        discountPrice: 42500000,
        stock: 8,
        isActive: true,
        hasOrderHistory: true,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Vải len Super 180s nhập khẩu từ Ý, ve áo phủ lụa Satin đen tuyền."
    },
    {
        id: 3,
        name: "Đầm Dạ Hội L'Éclat D'Or Champagne",
        categoryId: 3,
        price: 65000000,
        discountPrice: null,
        stock: 5,
        isActive: true,
        hasOrderHistory: false,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Đầm đuôi cá đính kết thủ công 300 giờ với chỉ tơ vàng đồng và pha lê Áo."
    },
    {
        id: 4,
        name: "Túi Xách Da Bê Box Calf Sovereign Gold",
        categoryId: 4,
        price: 36000000,
        discountPrice: 32000000,
        stock: 10,
        isActive: true,
        hasOrderHistory: false,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Da bê Pháp thuộc thảo mộc kết hợp khóa cài mạ vàng PVD 18K chống xước."
    }
];

const defaultOrders = [
    {
        orderId: 1001,
        date: "18/10/2026 14:30",
        status: "Delivered",
        address: "Vinhomes Golden River, Quận 1, TP.HCM",
        phone: "0988776655",
        total: 53300000,
        items: [
            { name: "Áo Sơ Mi Lụa Tơ Tằm Imperial Ivory", qty: 1, price: 10800000 },
            { name: "Bộ Vest Tuxedo Noir Royal Wool", qty: 1, price: 42500000 }
        ]
    }
];

const categories = {
    1: "Áo Sơ Mi Lụa & Couture",
    2: "Bespoke Vest & Tuxedo",
    3: "Đầm Dạ Hội Haute Couture",
    4: "Phụ Kiện Da Thuộc & Trang Sức"
};

function loadData(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) return JSON.parse(JSON.stringify(fallback));
    try {
        return JSON.parse(raw);
    } catch {
        return JSON.parse(JSON.stringify(fallback));
    }
}

function saveAllData() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(authUsers));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function resetDemoStorage() {
    if (window.confirm("Khôi phục toàn bộ dữ liệu về mặc định?")) {
        Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
        location.reload();
    }
}

let currentRole = "Customer";
let authUsers = loadData(STORAGE_KEYS.USERS, [
    { name: "Nguyễn Minh Khuê", email: "khach@maisonaura.vn", password: "12345678" }
]);
let currentUser = loadData(STORAGE_KEYS.CURRENT_USER, null);
let products = loadData(STORAGE_KEYS.PRODUCTS, defaultProducts);
let cart = loadData(STORAGE_KEYS.CART, []);
let orders = loadData(STORAGE_KEYS.ORDERS, defaultOrders);

function formatVND(amount) {
    return amount.toLocaleString("vi-VN") + " ₫";
}

function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function showAlert(message, type = "gold") {
    const alertClass = type === "danger" ? "alert-danger" : "bg-noir text-gold border-gold";
    const closeClass = type === "danger" ? "" : "btn-close-white";
    document.getElementById("alert-box-container").innerHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show rounded-0 shadow-sm" role="alert">
            <i class="bi bi-sparkles me-2"></i> ${message}
            <button type="button" class="btn-close ${closeClass}" data-bs-dismiss="alert"></button>
        </div>`;
}

function updateAuthNav() {
    const isSignedIn = Boolean(currentUser);
    document.getElementById("guest-actions").classList.toggle("d-none", isSignedIn);
    document.getElementById("signed-in-actions").classList.toggle("d-none", !isSignedIn);
    if (currentUser) {
        document.getElementById("current-user-label").textContent =
            currentRole === "Admin" ? "Giám Đốc Sáng Tạo (Admin)" : currentUser.name;
        document.getElementById("checkout-receiver").value = currentUser.name;
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim().toLowerCase();
    const password = document.getElementById("register-password").value;
    const confirmation = document.getElementById("register-confirm-password").value;

    if (password !== confirmation) {
        showAlert("Mật khẩu xác nhận không khớp.", "danger");
        return;
    }
    if (authUsers.some(u => u.email === email)) {
        showAlert("Email này đã được đăng ký.", "danger");
        return;
    }

    authUsers.push({ name, email, password });
    saveAllData();
    event.target.reset();
    document.getElementById("login-email").value = email;
    showSection("login");
    showAlert("Đăng ký thành công! Hãy đăng nhập bằng tài khoản vừa tạo.");
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;
    const user = authUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        showAlert("Email hoặc mật khẩu không chính xác.", "danger");
        return;
    }

    currentUser = user;
    saveAllData();
    event.target.reset();
    updateAuthNav();
    showSection("catalog");
    showAlert(`Xin chào, <strong>${escapeHTML(user.name)}</strong>!`);
}

function logout() {
    currentUser = null;
    saveAllData();
    updateAuthNav();
    showSection("catalog");
    showAlert("Bạn đã đăng xuất.");
}

function renderCatalog() {
    const keyword = document.getElementById("filter-keyword").value.trim().toLowerCase();
    const catId = parseInt(document.getElementById("filter-category").value, 10);
    const sortOrder = document.getElementById("filter-sort").value;

    let filtered = products.filter(p => p.isActive);

    if (catId > 0) filtered = filtered.filter(p => p.categoryId === catId);
    if (keyword) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword)
        );
    }

    if (sortOrder === "price_asc") {
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortOrder === "price_desc") {
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else {
        filtered.sort((a, b) => b.id - a.id);
    }

    const grid = document.getElementById("product-grid-container");

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center py-5"><p class="fs-5 font-serif text-muted">Không tìm thấy sản phẩm phù hợp.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map(p => {
        const priceHtml = p.discountPrice
            ? `<span class="text-muted text-decoration-line-through small me-2">${formatVND(p.price)}</span>
               <span class="text-gold fw-bold">${formatVND(p.discountPrice)}</span>`
            : `<span class="text-dark fw-bold">${formatVND(p.price)}</span>`;

        return `
            <div class="col-6 col-md-6 col-lg-3">
                <div class="luxury-product-card">
                    <div class="product-img-wrapper" onclick="openProductModal(${p.id})">
                        <img src="${p.image}" alt="${escapeHTML(p.name)}" />
                        ${p.discountPrice ? '<span class="position-absolute top-0 start-0 bg-noir text-gold px-2 py-1 m-2 small text-uppercase">Private Sale</span>' : ""}
                        <span class="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 m-2 small opacity-75">
                            <i class="bi bi-zoom-in"></i> Xem & Zoom
                        </span>
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between p-3 text-center">
                        <div>
                            <p class="text-muted small text-uppercase mb-1">${categories[p.categoryId]}</p>
                            <h5 class="font-serif fw-bold mb-2" style="cursor:pointer" onclick="openProductModal(${p.id})">${escapeHTML(p.name)}</h5>
                        </div>
                        <div class="mt-2">
                            <div>${priceHtml}</div>
                            <p class="small text-muted mb-2 mt-1">Tồn kho: <strong>${p.stock}</strong></p>
                            <button class="btn btn-gold btn-sm w-100 text-uppercase tracking-wider"
                                    onclick="addToCart(${p.id})" ${p.stock <= 0 ? "disabled" : ""}>
                                ${p.stock > 0 ? '<i class="bi bi-bag-plus me-1"></i> Thêm Vào Giỏ' : "Tạm Hết Hàng"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    }).join("");
}

function filterByCategory(catId) {
    showSection("catalog");
    document.getElementById("filter-category").value = catId;
    renderCatalog();
}

function resetFilters() {
    document.getElementById("filter-keyword").value = "";
    document.getElementById("filter-category").value = "0";
    document.getElementById("filter-sort").value = "newest";
    renderCatalog();
}

function switchModalImage(url) {
    document.getElementById("modal-main-img").src = url;
}

function openProductModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    document.getElementById("modal-name").textContent = p.name;
    document.getElementById("modal-category").textContent = categories[p.categoryId];
    document.getElementById("modal-price").textContent = formatVND(p.discountPrice || p.price);
    document.getElementById("modal-desc").textContent = p.desc;
    document.getElementById("modal-stock").textContent = p.stock + " sản phẩm sẵn sàng";
    document.getElementById("modal-main-img").src = p.image;

    document.getElementById("modal-gallery-thumbs").innerHTML = p.gallery.map(imgUrl => `
        <img src="${imgUrl}" style="width: 60px; height: 75px; object-fit: cover; cursor: pointer;"
             class="border border-gold p-1" onclick="switchModalImage('${imgUrl}')" />
    `).join("");

    const modalEl = document.getElementById("productDetailModal");
    const addBtn = document.getElementById("modal-add-cart-btn");
    addBtn.onclick = function () {
        addToCart(p.id);
        bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    };

    bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function addToCart(productId) {
    const p = products.find(x => x.id === productId);
    if (!p || p.stock <= 0) return;

    const item = cart.find(c => c.productId === productId);
    if (item) {
        if (item.qty + 1 > p.stock) {
            showAlert(`Kho chỉ còn tối đa ${p.stock} sản phẩm!`, "danger");
            return;
        }
        item.qty++;
    } else {
        cart.push({
            productId: p.id,
            name: p.name,
            image: p.image,
            price: p.discountPrice || p.price,
            qty: 1
        });
    }
    saveAllData();
    updateCartUI();
    showAlert(`Đã thêm <strong>${escapeHTML(p.name)}</strong> vào giỏ hàng.`);
}

function updateCartUI() {
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    document.getElementById("cart-badge").textContent = totalQty;

    const tbody = document.getElementById("cart-table-body");
    let totalAmount = 0;

    if (cart.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Giỏ hàng của Quý khách đang trống.</td></tr>`;
    } else {
        tbody.innerHTML = cart.map(item => {
            const sub = item.price * item.qty;
            totalAmount += sub;
            return `
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <img src="${item.image}" style="width: 50px; height: 65px; object-fit: cover;" />
                            <span class="fw-semibold small">${escapeHTML(item.name)}</span>
                        </div>
                    </td>
                    <td class="small">${formatVND(item.price)}</td>
                    <td>
                        <input type="number" class="form-control form-control-sm rounded-0 text-center"
                               value="${item.qty}" min="1" onchange="changeCartQty(${item.productId}, this.value)" />
                    </td>
                    <td class="fw-bold text-gold">${formatVND(sub)}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger rounded-0" onclick="removeFromCart(${item.productId})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`;
        }).join("");
    }
    document.getElementById("cart-total-display").textContent = formatVND(totalAmount);
}

function changeCartQty(productId, newQty) {
    const p = products.find(x => x.id === productId);
    const item = cart.find(c => c.productId === productId);
    const parsedQty = parseInt(newQty, 10);

    if (!parsedQty || parsedQty <= 0) {
        removeFromCart(productId);
        return;
    }
    if (parsedQty > p.stock) {
        alert(`Tồn kho hiện tại chỉ còn ${p.stock} sản phẩm!`);
        updateCartUI();
        return;
    }
    item.qty = parsedQty;
    saveAllData();
    updateCartUI();
}

function removeFromCart(productId) {
    const item = cart.find(c => c.productId === productId);
    if (item && window.confirm(`Bạn có chắc chắn muốn xóa [${item.name}] khỏi giỏ hàng không?`)) {
        cart = cart.filter(c => c.productId !== productId);
        saveAllData();
        updateCartUI();
    }
}

function handleCheckout(e) {
    e.preventDefault();
    if (cart.length === 0) {
        showAlert("Giỏ hàng trống, không thể thanh toán!", "danger");
        return;
    }

    const phone = document.getElementById("checkout-phone").value.trim();
    const address = document.getElementById("checkout-address").value.trim();
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;

    if (!phoneRegex.test(phone)) {
        alert("Số điện thoại người nhận không hợp lệ!");
        return;
    }

    let orderTotal = 0;
    const orderItems = [];

    for (const c of cart) {
        const prod = products.find(p => p.id === c.productId);
        if (!prod || prod.stock < c.qty) {
            showAlert(`Sản phẩm ${c.name} không đủ tồn kho!`, "danger");
            return;
        }
        prod.stock -= c.qty;
        prod.hasOrderHistory = true;
        orderTotal += c.price * c.qty;
        orderItems.push({ name: c.name, qty: c.qty, price: c.price });
    }

    const newOrderId = 1000 + orders.length + 1;
    orders.unshift({
        orderId: newOrderId,
        date: new Date().toLocaleString("vi-VN"),
        status: "Pending",
        address: address,
        phone: phone,
        total: orderTotal,
        items: orderItems
    });

    cart = [];
    saveAllData();
    updateCartUI();
    renderCatalog();
    renderOrders();
    showSection("orders");
    showAlert(`Đặt hàng thành công! Mã đơn hàng <strong>#${newOrderId}</strong> đã được lưu và trừ tồn kho.`);
}

function renderOrders() {
    const container = document.getElementById("order-history-container");
    container.innerHTML = orders.map(o => {
        const itemsHtml = o.items
            .map(i => `<li>${escapeHTML(i.name)} (x${i.qty}) - <strong>${formatVND(i.price * i.qty)}</strong></li>`)
            .join("");
        return `
            <div class="bg-white border border-gold p-4 mb-3 shadow-sm">
                <div class="d-flex flex-wrap justify-content-between border-bottom pb-2 mb-3">
                    <div>
                        <span class="fw-bold font-serif fs-5">Đơn hàng #${o.orderId}</span>
                        <span class="text-muted small ms-2">(${o.date})</span>
                    </div>
                    <span class="badge ${o.status === "Delivered" ? "bg-success" : "bg-warning text-dark"} rounded-0 px-3 py-2">
                        ${o.status}
                    </span>
                </div>
                <p class="small mb-2"><i class="bi bi-geo-alt text-gold me-1"></i> <strong>Giao đến:</strong> ${escapeHTML(o.address)} - SĐT: ${escapeHTML(o.phone)}</p>
                <ul class="small text-muted mb-2">${itemsHtml}</ul>
                <div class="text-end fw-bold text-gold fs-5">Tổng cộng: ${formatVND(o.total)}</div>
            </div>`;
    }).join("");
}

function switchRole(role) {
    currentRole = role;
    document.getElementById("role-customer-btn").classList.toggle("active", role === "Customer");
    document.getElementById("role-admin-btn").classList.toggle("active", role === "Admin");
    updateAuthNav();
    renderAdmin();
    showAlert(`Đã chuyển quyền hiện tại sang: <strong>${role}</strong>.`);
}

function renderAdmin() {
    const warningEl = document.getElementById("admin-403-warning");
    const contentEl = document.getElementById("admin-dashboard-content");

    if (currentRole !== "Admin") {
        warningEl.classList.remove("d-none");
        contentEl.classList.add("d-none");
        return;
    }

    warningEl.classList.add("d-none");
    contentEl.classList.remove("d-none");

    const totalRev = orders.reduce((s, o) => s + o.total, 0);
    document.getElementById("admin-kpi-revenue").textContent = formatVND(totalRev);
    document.getElementById("admin-kpi-orders").textContent = orders.length;
    document.getElementById("admin-kpi-products").textContent = products.filter(p => p.isActive).length;

    document.getElementById("admin-product-tbody").innerHTML = products.map(p => `
        <tr class="${!p.isActive ? "table-secondary text-muted" : ""}">
            <td>#${p.id}</td>
            <td><img src="${p.image}" style="width: 42px; height: 55px; object-fit: cover;" /></td>
            <td class="fw-semibold">${escapeHTML(p.name)}</td>
            <td class="small">${categories[p.categoryId]}</td>
            <td class="text-gold fw-bold">${formatVND(p.discountPrice || p.price)}</td>
            <td>${p.stock}</td>
            <td>
                <span class="badge ${p.isActive ? "bg-success" : "bg-secondary"} rounded-0">
                    ${p.isActive ? "Đang bán" : "Ngừng KD"}
                </span>
            </td>
            <td>
                <span class="badge ${p.hasOrderHistory ? "bg-info text-dark" : "bg-light text-dark border"}">
                    ${p.hasOrderHistory ? "Đã có đơn" : "Chưa có đơn"}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-danger rounded-0" onclick="adminDeleteProduct(${p.id})">
                    <i class="bi bi-trash"></i> Xóa
                </button>
            </td>
        </tr>`).join("");
}

function adminDeleteProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    if (!window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm [${p.name}] không?`)) {
        return;
    }

    if (p.hasOrderHistory) {
        p.isActive = false;
        p.stock = 0;
        showAlert(`Sản phẩm <strong>[${escapeHTML(p.name)}]</strong> đã phát sinh đơn hàng nên được chuyển sang <strong>Xóa Mềm</strong>!`);
    } else {
        products = products.filter(x => x.id !== id);
        showAlert(`Đã <strong>Xóa Cứng</strong> sản phẩm <strong>[${escapeHTML(p.name)}]</strong>.`);
    }
    saveAllData();
    renderAdmin();
    renderCatalog();
}

function handleAdminCreateProduct(e) {
    e.preventDefault();
    const newProd = {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: document.getElementById("new-prod-name").value.trim(),
        categoryId: parseInt(document.getElementById("new-prod-cat").value, 10),
        price: parseFloat(document.getElementById("new-prod-price").value),
        discountPrice: null,
        stock: parseInt(document.getElementById("new-prod-stock").value, 10),
        isActive: true,
        hasOrderHistory: false,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
        gallery: ["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"],
        desc: document.getElementById("new-prod-desc").value.trim()
    };
    products.unshift(newProd);
    saveAllData();
    bootstrap.Modal.getOrCreateInstance(document.getElementById("addProductModal")).hide();
    e.target.reset();
    renderAdmin();
    renderCatalog();
    showAlert(`Đã thêm sản phẩm mới <strong>[${escapeHTML(newProd.name)}]</strong>!`);
}

function showSection(name) {
    ["catalog", "cart", "orders", "login", "register", "admin"].forEach(sec => {
        document.getElementById(`section-${sec}`).classList.toggle("d-none", sec !== name);
    });
    if (name === "admin") renderAdmin();
    if (name === "orders") renderOrders();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function setViewport(size) {
    const sim = document.getElementById("viewport-simulator");
    sim.classList.remove("viewport-375", "viewport-768", "viewport-full");
    sim.classList.add(`viewport-${size}`);
}

document.addEventListener("DOMContentLoaded", function () {
    const zoomBox = document.getElementById("zoom-box");
    const mainImg = document.getElementById("modal-main-img");

    zoomBox.addEventListener("mousemove", function (e) {
        const rect = zoomBox.getBoundingClientRect();
        const relX = ((e.clientX - rect.left) / rect.width) * 100;
        const relY = ((e.clientY - rect.top) / rect.height) * 100;
        mainImg.style.transformOrigin = `${relX}% ${relY}%`;
        mainImg.style.transform = "scale(2.15)";
    });

    zoomBox.addEventListener("mouseleave", function () {
        mainImg.style.transform = "scale(1)";
        mainImg.style.transformOrigin = "center center";
    });

    updateAuthNav();
    renderCatalog();
    updateCartUI();
    renderOrders();
});