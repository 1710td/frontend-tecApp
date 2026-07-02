
/* SIDEBAR */
.sidebar {
    width: 250px;
    background: linear-gradient(180deg, #ca0d0d, #420101);
    color: white;
    padding: 20px;
    flex-shrink: 0;
}

.sidebar ul {
    list-style: none;
}

.sidebar li {
    padding: 14px;
    margin-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
}

.sidebar li:hover, .sidebar li.active {
    background: rgba(255, 255, 255, 0.2);
}

.sidebar a {
    text-decoration: none;
    color: inherit;
    display: block;
}

.sidebar-help {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 12px 14px;
    margin-top: auto;
}

.sidebar-help i {
    font-size: 22px;
    color: rgba(255,255,255,0.7);
    flex-shrink: 0;
}