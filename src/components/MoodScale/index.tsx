import { FC, useCallback, useEffect, useState } from "react";
import styles from "./style.module.css";

interface Props {
  data: {
    date: string;
    array: {
      time: string;
      feelings: string[];
      stress: number;
      assessment: number;
      notes: string;
    }[];
  }[];
  tab2: string
}

interface FeelingItem {
  name: string;
  value: number;
}

const MoodScale: FC<Props> = ({ data, tab2 }) => {
  const [moodscaleData, setMoodscaleData] = useState<FeelingItem[]>([]);
  console.log(moodscaleData)

  function feelColor(name: string) {
    switch (name) {
      case "Радость":
        return "#FF8702";
      case "Страх":
        return "#F8CB2F";
      case "Бешенство":
        return "#FB5935";
      case "Грусть":
        return "#92D35E";
      case "Спокойствие":
        return "#40BF7B";
      case "Сила":
        return "#15A8B1";
      default:
        return "#FF8702";
    }
  }

  const addItems: { name: string; array: string[] }[] = [
    {
      name: "Радость",
      array: [
        "Благодарность",
        "Доверие",
        "Воодушевление",
        "Озарение",
        "Сопричастность",
        "Умиротворение",
        "Радушие",
        "Единство",
        "Торжественность",
        "Наслаждение",
        "Общность",
        "Восторг",
        "Благодать",
        "Поддержка",
        "Веселье",
        "Надежда",
        "Уверенность",
        "Легкость",
        "Любовь",
        "Удовлетворение",
        "Облегчение",
        "Обожание",
        "Преклонение",
        "Подъем духа",
        "Энтузиазм",
      ],
    },
    {
      name: "Страх",
      array: [
        "Волнение",
        "Испуг",
        "Паника",
        "Беспокойство",
        "Неуверенность",
        "Боязливость",
        "Подозрительность",
        "Трусость",
        "Нерешительность",
        "Настороженность",
        "Смятение",
        "Тревога",
        "Ужас",
        "Опасение",
        "Отвращение",
        "Робость",
        "Застенчивость",
        "Безнадежность",
        "Сдержанность",
        "Скрытность",
        "Жалость",
        "Скованность",
        "Замешательство",
        "Ошарашенность",
        "Озадаченность",
      ],
    },
    {
      name: "Бешенство",
      array: [
        "Холодность",
        "Злость",
        "Сарказм",
        "Раздражение",
        "Ярость",
        "Унижение",
        "Обида",
        "Ненависть",
        "Нетерпение",
        "Отвращение",
        "Надменность",
        "Злорадство",
        "Недовольство",
        "Ценизм",
        "Протест",
        "Неистовость",
        "Враждебность",
        "Равнодушие",
        "Безучастность",
        "Неприязнь",
        "Пренебрежение",
        "Зависть",
        "Мстительность",
        "Высокомерие",
      ],
    },
    {
      name: "Грусть",
      array: [
        "Огорчение",
        "Горе",
        "Боль",
        "Угнетенность",
        "Отвращение",
        "Одиночество",
        "Отчуждение",
        "Разочарование",
        "Поражение",
        "Жалость к себе",
        "Унижение",
        "Тоска",
        "Подавленность",
        "Предательство",
        "Скука",
        "Печаль",
        "Апатия",
        "Равнодушие",
        "Принижение",
        "Раздражение",
        "Обида",
        "Скорбь",
        "Отверженность",
        "Отчаяние",
      ],
    },
    {
      name: "Спокойствие",
      array: [
        "Покой",
        "Защищенность",
        "Безопасность",
        "Комфорт",
        "Стабильность",
        "Легкость",
        "Умиротворение",
        "Хладнокровие",
        "Блаженство",
        "Доверие",
        "Смирение",
      ],
    },
    {
      name: "Сила",
      array: [
        "Уверенность",
        "Решительность",
        "Бодрость",
        "Власть",
        "Гордость",
        "Гибкость",
        "Вдохновение",
        "Энергичность",
        "Готовность",
        "Воодушевление",
        "Мощь",
      ],
    },
  ];

  const getData = useCallback(() => {
    const result: FeelingItem[] = [];

    const feelingsCount: { [key: string]: number } = data.reduce(
      (accumulator, currentValue) => {
        currentValue.array.forEach((entry) => {
          // @ts-ignore
          Object.values(entry.feelings).forEach((feelingArray: string[]) => {
            feelingArray.forEach((feeling) => {
              // @ts-ignore
              accumulator[feeling] = (accumulator[feeling] || 0) + 1;
            });
          });
        });
        return accumulator;
      },
      {}
    );

    const totalFeelings = Object.values(feelingsCount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    addItems.forEach((addItem) => {
      const count = addItem.array.reduce((accumulator, currentValue) => {
        return accumulator + (feelingsCount[currentValue] || 0);
      }, 0);
      const percentage =
        totalFeelings > 0 ? Math.round((count / totalFeelings) * 100) : 0;
      result.push({ name: addItem.name, value: percentage });
    });

    const sum = result.reduce((acc, curr) => acc + curr.value, 0);
    if (sum > 100) {
      const diff = sum - 100;
      const firstNonZeroIndex = result.findIndex((item) => item.value !== 0);
      if (firstNonZeroIndex !== -1) {
        result[firstNonZeroIndex].value -= diff;
      }
    }

    setMoodscaleData(result);
  }, [data]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className={styles.MoodScale}>
      <div className={styles.Range}>
        {moodscaleData.map((item, index) => (
          <div
            key={index}
            style={{
              background: feelColor(item.name),
              width: `${item.value}%`,
            }}
          />
        ))}
      </div>

      <div className={styles.Values}>
        {moodscaleData.map((item, index) => (
          <div key={index} className={styles.ValuesItems}>
            <div style={{ background: feelColor(item.name) }} />
            <p>{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodScale;
