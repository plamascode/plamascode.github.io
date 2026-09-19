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
});// app.js
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
            
            // 這裡保留 href 讓滑鼠移過去時能在左下角看到網址，但我們會攔截點擊事件
            link.href = project.path; 
            link.textContent = project.title;
            
            // 監聽點擊事件
            link.addEventListener('click', async (event) => {
                // 停止預設的直接跳轉行為
                event.preventDefault(); 
                
                try {
                    // 發送 HEAD 請求來檢查檔案是否存在 (不下載整個檔案，速度較快)
                    const response = await fetch(project.path, { method: 'HEAD' });

                    if (response.ok) {
                        // 如果狀態碼是 200-299，代表檔案存在，在新分頁開啟
                        window.open(project.path, '_blank');
                    } else {
                        // 如果狀態碼是 404 等錯誤，跳出提示並顯示路徑
                        alert(`找不到作品檔案！\n請確認檔案是否有上傳，或路徑是否正確：\n\n${project.path}`);
                    }
                } catch (error) {
                    // 如果發生網路錯誤或是跨域問題 (例如直接貼 Scratch 官方網址)
                    // 若是外部網址(http開頭)，則直接開啟；若是本地路徑則報錯
                    if (project.path.startsWith('http')) {
                        window.open(project.path, '_blank');
                    } else {
                        alert(`無法檢查檔案狀態，路徑可能有誤：\n\n${project.path}`);
                    }
                }
            });
            
            listItem.appendChild(link);
            list.appendChild(listItem);
        });

        card.appendChild(list);
        container.appendChild(card);
    });
});