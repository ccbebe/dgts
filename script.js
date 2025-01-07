function formatDate(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return "";
    }
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

function calculateDate(startDate, daysToAdd, timeOfDay = "startOfDay") {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + daysToAdd);
    
    if (timeOfDay === "startOfDay") {
        newDate.setHours(0, 0, 0, 0);
    } else if (timeOfDay === "endOfDay") {
        newDate.setHours(23, 59, 59, 999);
    }

    return newDate;
}

function createTimeline(startDate) {
    if (window.timeline) {
        window.timeline.destroy();
    }

    const tb1Start = calculateDate(startDate, 0, "startOfDay");
    const tb1End = calculateDate(startDate, 2, "endOfDay");
    const tb2Start = calculateDate(startDate, 3, "startOfDay");
    const tb2End = calculateDate(startDate, 18, "endOfDay");
    const niemYetStart = calculateDate(startDate, 1, "startOfDay");
    const niemYetEnd = calculateDate(startDate, 18, "endOfDay");
    const muaHoSoStart = calculateDate(startDate, 1, "startOfDay");
    const muaHoSoEnd = calculateDate(startDate, 16, "endOfDay");
    const xemTaiSanStart = calculateDate(startDate, 8, "startOfDay");
    const xemTaiSanEnd = calculateDate(startDate, 10, "endOfDay");
    const nopTienStart = calculateDate(startDate, 1, "startOfDay");
    const nopTienEnd = calculateDate(startDate, 16, "endOfDay");
    const dauGiaStart = calculateDate(startDate, 21, "startOfDay");
    const dauGiaEnd = calculateDate(startDate, 21, "endOfDay");

    document.getElementById("row-tb1").querySelector(".start").textContent = formatDate(tb1Start);
    document.getElementById("row-tb1").querySelector(".end").textContent = formatDate(tb1End);
    document.getElementById("row-tb1").querySelector(".duration").textContent = 3;

    document.getElementById("row-tb2").querySelector(".start").textContent = formatDate(tb2Start);
    document.getElementById("row-tb2").querySelector(".end").textContent = formatDate(tb2End);
    document.getElementById("row-tb2").querySelector(".duration").textContent = 16;

    document.getElementById("row-niemYet").querySelector(".start").textContent = formatDate(niemYetStart);
    document.getElementById("row-niemYet").querySelector(".end").textContent = formatDate(niemYetEnd);
    document.getElementById("row-niemYet").querySelector(".duration").textContent = 18;

    document.getElementById("row-muaHoSo").querySelector(".start").textContent = formatDate(muaHoSoStart);
    document.getElementById("row-muaHoSo").querySelector(".end").textContent = formatDate(muaHoSoEnd);
    document.getElementById("row-muaHoSo").querySelector(".duration").textContent = 16;

    document.getElementById("row-xemTaiSan").querySelector(".start").textContent = formatDate(xemTaiSanStart);
    document.getElementById("row-xemTaiSan").querySelector(".end").textContent = formatDate(xemTaiSanEnd);
    document.getElementById("row-xemTaiSan").querySelector(".duration").textContent = 3;

    document.getElementById("row-nopTien").querySelector(".start").textContent = formatDate(nopTienStart);
    document.getElementById("row-nopTien").querySelector(".end").textContent = formatDate(nopTienEnd);
    document.getElementById("row-nopTien").querySelector(".duration").textContent = 16;

    document.getElementById("row-dauGia").querySelector(".start").textContent = formatDate(dauGiaStart);
    document.getElementById("row-dauGia").querySelector(".end").textContent = formatDate(dauGiaEnd);
    document.getElementById("row-dauGia").querySelector(".duration").textContent = 1;

    const items = new vis.DataSet([
        { id: 1, content: 'TB lần 1', start: tb1Start, end: tb1End, title: 'Thông báo công khai lần 1' },
        { id: 2, content: 'TB lần 2', start: tb2Start, end: tb2End, title: 'Thông báo công khai lần 2' },
        { id: 3, content: 'Niêm yết', start: niemYetStart, end: niemYetEnd, title: 'Niêm yết tài sản' },
        { id: 4, content: 'Mua hồ sơ', start: muaHoSoStart, end: muaHoSoEnd, title: 'Mua hồ sơ đấu giá' },
        { id: 5, content: 'Xem tài sản', start: xemTaiSanStart, end: xemTaiSanEnd, title: 'Thời gian xem tài sản' },
        { id: 6, content: 'Nộp tiền', start: nopTienStart, end: nopTienEnd, title: 'Nộp tiền đặt trước' },
        { id: 7, content: 'DG', start: dauGiaStart, end: dauGiaEnd, title: 'Ngày tổ chức đấu giá', type: 'range' }
    ]);

    const options = {
        start: calculateDate(startDate, -7, "startOfDay"),
        end: calculateDate(dauGiaEnd, 3, "endOfDay"),
        editable: false,
        showCurrentTime: false,
        stack: true, // Sử dụng chế độ stack để tránh chồng lên nhau
        margin: { item: { horizontal: 0, vertical: 10 } },
        orientation: { axis: 'top', item: 'top' },
        height: '280px', // Đặt chiều cao cố định
        verticalScroll: true, // Bật cuộn dọc nếu không vừa
        horizontalScroll: true,
        timeAxis: { scale: 'day', step: 1 }
    };

    const container = document.getElementById('visualization');
    const timeline = new vis.Timeline(container, items, options);
    window.timeline = timeline;
}

const startDateInput = document.getElementById("startDate");
startDateInput.addEventListener("change", () => {
    const dateValue = new Date(startDateInput.value);
    if (isNaN(dateValue.getTime())) {
        alert("Vui lòng nhập một ngày hợp lệ!");
        return;
    }
    createTimeline(startDateInput.value);
});

createTimeline("2025-01-06");
