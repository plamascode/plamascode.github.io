// app.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('portfolio-container');

    // 檢查 data.js 中的 studentProjects 是否存在
    if (typeof studentProjects === 'undefined') {
        container.innerHTML = '<p style="text-align:center; color:red;">找不到資料，請確認 data.js 設定是否正確。</p>';
        return;
    }

    // 讀取每位學生的資料
    studentProjects.forEach(student => {
        // 建立學生的卡片容器
        const card = document.createElement('div');
        card.className = 'student-card';

        // 建立學生姓名標題
        const nameHeader = document.createElement('h2');
        nameHeader.className = 'student-name';
        nameHeader.textContent = student.studentName;
        card.appendChild(nameHeader);

        // 建立作品列表
        const list = document.createElement('ul');
        list.className = 'project-list';

        student.projects.forEach(project => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = project.path;
            link.textContent = project.title;
            // target="_blank" 讓作品在新的分頁開啟
            link.target = '_blank'; 
            
            listItem.appendChild(link);
            list.appendChild(listItem);
        });

        card.appendChild(list);
        container.appendChild(card);
    });
});