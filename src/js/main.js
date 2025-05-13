// 우측 > 상세추이 > 차트 샘플
const chartConfigs = [
  {
    id: 'chartA1',
    dailyData: [
      [10, 20, 30, 40, 50, 60, 70],
      [15, 25, 35, 45, 55, 65, 75],
      [20, 30, 40, 50, 60, 70, 80],
    ],
    weeklyData: [
      [70, 60, 50, 40, 30, 20, 10],
      [75, 65, 55, 45, 35, 25, 15],
      [80, 70, 60, 50, 40, 30, 20],
    ],
  },
  {
    id: 'chartA2',
    dailyData: [
      [12, 22, 32, 42, 52, 62, 72],
      [17, 27, 37, 47, 57, 67, 77],
      [22, 32, 42, 52, 62, 72, 82],
    ],
    weeklyData: [
      [72, 62, 52, 42, 32, 22, 12],
      [77, 67, 57, 47, 37, 27, 17],
      [82, 72, 62, 52, 42, 32, 22],
    ],
  },
  {
    id: 'chartA3',
    dailyData: [
      [14, 24, 34, 44, 2, 64, 74],
      [19, 29, 39, 49, 59, 69, 79],
      [24, 34, 44, 54, 64, 74, 84],
    ],
    weeklyData: [
      [74, 64, 54, 44, 34, 24, 14],
      [79, 69, 59, 49, 39, 29, 19],
      [84, 74, 64, 54, 44, 34, 24],
    ],
  },
];

const colors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(199, 199, 199, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(255, 102, 255, 1)',
];

const backgroundColors = colors.map((color) => color.replace('1)', '0.2)'));

const charts = {};

chartConfigs.forEach((config, index) => {
  const ctx = document.getElementById(config.id).getContext('2d');
  charts[config.id] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
      datasets: config.dailyData.map((data, dataIndex) => ({
        label: `Dataset ${dataIndex + 1}`,
        data,
        borderColor: colors[(index * 0 + dataIndex) % colors.length],
        backgroundColor:
          backgroundColors[(index * 0 + dataIndex) % backgroundColors.length],
        borderWidth: 2,
      })),
    },
    options: {
      responsive: true,
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  });

  document.getElementById(`${config.id}daily`).addEventListener('click', () => {
    updateChart(config.id, config.dailyData, 'Day');
  });

  document
    .getElementById(`${config.id}weekly`)
    .addEventListener('click', () => {
      updateChart(config.id, config.weeklyData, 'Week');
    });
});

function updateChart(chartId, dataSets, labelType) {
  const chart = charts[chartId];
  chart.data.labels = Array.from(
    { length: 7 },
    (_, i) => `${labelType} ${i + 1}`
  );
  chart.data.datasets.forEach((dataset, idx) => {
    dataset.data = dataSets[idx];
  });
  chart.update();
}

// 우측 > AI 주제 분석 관련 >> 운영서버의 내용 일단 그대로 복붙 >> 정리하자
// 카테고리별 클릭 이벤트 추가 ( 1) "#카테고리" 변경  2) classList(on)변경)
let topicItems = document
  .querySelector('.topic__list')
  .querySelectorAll('.topic__item');
topicItems.forEach((tItem) => {
  // console.log(tItem);
  tItem.addEventListener('click', () => {
    // 1) "#카테고리" 변경
    let category_idx = tItem.id.split('_');
    // console.log(category_idx);
    let category_idx2 = category_idx.pop();
    let category_idx1 = category_idx.pop();
    // console.log(category_idx1, category_idx2);
    getTopicContent(brand_idx, category_idx1, category_idx2);
    // 2) classList(on)변경
    let beforetItemOn = document
      .querySelector('.topic__list')
      .querySelector('.on');
    beforetItemOn.classList.remove('on');
    tItem.classList.add('on');

    // 우측 텍스트박스 컨텐츠 제목 > 선택한 카테고리 이름으로 변경하기 // 한희재 250327_1540
    let tItemName = tItem.querySelector('.topic-element');
    let selectedtItemName = document.querySelector('#detailTopicName');
    selectedtItemName.innerText = tItemName.textContent;
  });
});
