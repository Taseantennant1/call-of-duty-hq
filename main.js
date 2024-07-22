document.addEventListener('DOMContentLoaded', async function() {
    try {
        console.log('Fetching member count...');
        const memberResponse = await fetch('/api/members');
        if (!memberResponse.ok) throw new Error('Failed to fetch member count');
        const memberData = await memberResponse.json();
        console.log('Member count data:', memberData);
        document.getElementById('member-count').textContent = memberData.memberCount;

        console.log('Fetching staff data...');
        const staffResponse = await fetch('/api/staff');
        if (!staffResponse.ok) throw new Error('Failed to fetch staff data');
        const staffData = await staffResponse.json();
        console.log('Staff data:', staffData);
        const staffContainer = document.getElementById('staff-members');

        staffData.forEach(staff => {
            const staffDiv = document.createElement('div');
            staffDiv.classList.add('staff');
            staffDiv.innerHTML = `
                <p>${staff.username}#${staff.id}</p>
                <p>${staff.info}</p>
            `;
            staffContainer.appendChild(staffDiv);
        });

        console.log('Fetching events data...');
        const eventsResponse = await fetch('/api/events');
        if (!eventsResponse.ok) throw new Error('Failed to fetch events data');
        const eventsData = await eventsResponse.json();
        console.log('Events data:', eventsData);
        const eventsList = document.getElementById('events-list');

        eventsData.forEach(event => {
            const eventItem = document.createElement('li');
            eventItem.textContent = `${event.name} - ${event.date}`;
            eventsList.appendChild(eventItem);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('error-message').textContent = 'Error fetching data: ' + error.message;
    }
});

function showSection(id) {
    console.log(`Showing section: ${id}`);
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
