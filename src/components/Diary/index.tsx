import {
  ArrowLeftIcon,
  Calendar2Icon,
  CloseIcon,
  DiaryIcon,
  StatsIcon,
} from "@/ui/Icons";
import styles from "./style.module.css";
import { useCallback, useEffect, useState } from "react";
import ButtonDefault from "@/ui/Buttons/Default";
import Range from "@/ui/Range";
import { useNavigate } from "react-router-dom";
import MoodScale from "../MoodScale";
import Chart from "../Chart";
import { DiaryAPI } from "@/api";

const Diary = () => {
  const navigate = useNavigate();
  const date = new Date();
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const month = date.getMonth();
  const day = date.getDate();
  const hour =
    String(date.getHours()).length === 1
      ? `0${date.getHours()}`
      : date.getHours();
  const minutes =
    String(date.getMinutes()).length === 1
      ? `0${date.getMinutes()}`
      : date.getMinutes();
  const [calendar, setCalendar] = useState(false);
  const sid = JSON.parse(localStorage.getItem("sid") as string);
  const [moodscale, setMoodscale] = useState<
    {
      date: string;
      array: {
        time: string;
        feelings: string[];
        stress: number;
        assessment: number;
        notes: string;
      }[];
    }[]
  >([]);
  const [stressData, setStressData] = useState<
    { value: number; time: number }[]
  >([]);
  const [assessmentData, setassessmentData] = useState<
    { value: number; time: number }[]
  >([]);

  const [tab, setTab] = useState("Дневник настроения");
  const tabs = [
    { name: "Дневник настроения", icon: DiaryIcon },
    { name: "Статистика", icon: StatsIcon },
  ];

  const [howFeel, setHowFeel] = useState<string[]>([]);
  const [emotion, setEmotion] = useState<
    "Радость" | "Страх" | "Бешенство" | "Грусть" | "Спокойствие" | "Сила"
  >("Радость");
  const items = [
    { name: "Радость", image: "/Emoji_1.png" },
    { name: "Страх", image: "/Emoji_2.png" },
    { name: "Бешенство", image: "/Emoji_3.png" },
    { name: "Грусть", image: "/Emoji_4.png" },
    { name: "Спокойствие", image: "/Emoji_5.png" },
    { name: "Сила", image: "/Emoji_6.png" },
  ];

  const [activeNameFeeling, setActiveNameFeeling] = useState<string[]>([])

  const addItems = [
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

  const [stress, setStress] = useState(50);
  const [selfRate, setSeltRate] = useState(50);
  const [note, setNote] = useState("");

  const [tab2, setTab2] = useState("ДН");
  const tabs2 = ["ДН", "НЕД", "МЕС", "ГОД"];

  const daysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthName = (month: number): string => {
    const monthNames: string[] = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    return monthNames[month];
  };

  const renderDays = (month: number, year: number): JSX.Element[] => {
    const totalDays: number = daysInMonth(month, year);
    const currentDate: Date = new Date();
    const daysArray: JSX.Element[] = [];
    for (let i = 1; i <= totalDays; i++) {
      const date: Date = new Date(year, month, i);
      const isActiveDay: boolean =
        date.toDateString() === currentDate.toDateString();
      daysArray.push(
        <span key={i} className={isActiveDay ? styles.ActiveDay : ""}>
          {i}
        </span>
      );
    }
    return daysArray;
  };

  function selectFeel(item: string) {
    if (howFeel.includes(item)) {
      const newFeel = howFeel.filter((i) => i !== item);
      setHowFeel(newFeel);
    } else {
      setHowFeel((prev) => [...prev, item]);
    }
  }

  async function saveFeeling() {
    const result = await DiaryAPI.feel(sid, howFeel, stress, selfRate, note);
    console.log(result);
    if ((result.status = 200)) {
      alert("Успешно сохранено");
      setHowFeel([]);
      setStress(50);
      setSeltRate(50);
      getFeeling();
    } else {
      alert(result.message);
    }
  }

  const getFeeling = useCallback(async () => {
    const result = await DiaryAPI.getDiary(sid);

    const formattedDataArray = [];

    for (const date in result.diary) {
      if (Object.hasOwnProperty.call(result.diary, date)) {
        formattedDataArray.push({ date, array: result.diary[date] });
      }
    }

    let filteredData = [];
    switch (tab2) {
      case "ДН":
        const today = new Date().toISOString().split("T")[0];
        filteredData = formattedDataArray.filter((item) => {
          const itemDateParts = item.date.split("-");
          const itemDateISO = `${itemDateParts[2]}-${itemDateParts[1]}-${itemDateParts[0]}`;
          return itemDateISO === today;
        });
        break;

      case "НЕД":
        const todayDate = new Date();
        const startOfWeek = new Date(todayDate);
        startOfWeek.setDate(todayDate.getDate() - todayDate.getDay());
        const endOfWeek = new Date(todayDate);
        endOfWeek.setDate(todayDate.getDate() + (6 - todayDate.getDay()));

        filteredData = formattedDataArray.filter((item) => {
          const itemDateParts = item.date.split("-");
          const itemDateISO = `${itemDateParts[2]}-${itemDateParts[1]}-${itemDateParts[0]}`;
          const itemDate = new Date(itemDateISO);
          return (
            itemDate.getDate() >= startOfWeek.getDate() &&
            itemDate.getDate() <= endOfWeek.getDate()
          );
        });
        break;
      case "МЕС":
        const currentMonth = new Date().getMonth() + 1;
        filteredData = formattedDataArray.filter((item) => {
          const itemMonth = parseInt(item.date.split("-")[1]);
          return itemMonth === currentMonth;
        });
        break;
      case "ГОД":
        const currentYear = new Date().getFullYear();
        filteredData = formattedDataArray.filter((item) => {
          const itemYear = parseInt(item.date.split("-")[2]);
          return itemYear === currentYear;
        });
        break;
      default:
        filteredData = formattedDataArray;
        break;
    }

    setMoodscale(filteredData);
  }, [sid, tab2]);

  useEffect(() => {
    getFeeling();
  }, [getFeeling]);

  const getStressData = useCallback(() => {
    const newData: { value: number; time: number }[] = [];
    const tempData: { [key: string]: { sum: number; count: number } } = {};

    moodscale.forEach((item) => {
      item.array.forEach((subItem) => {
        const time = subItem.time.split(" ")[1].slice(0, 5).split(":")[0];
        const stress = subItem.stress;

        if (!tempData[time]) {
          tempData[time] = { sum: 0, count: 0 };
        }

        tempData[time].sum += stress;
        tempData[time].count++;
      });
    });

    for (const time in tempData) {
      if (tempData.hasOwnProperty(time)) {
        const averageStress = tempData[time].sum / tempData[time].count;
        newData.push({ value: averageStress, time: Number(time) });
      }
    }

    setStressData(newData);
  }, [moodscale]);

  const getAsessmentData = useCallback(() => {
    const newData: { value: number; time: number }[] = [];
    const tempData: { [key: string]: { sum: number; count: number } } = {};

    moodscale.forEach((item) => {
      item.array.forEach((subItem) => {
        const time = subItem.time.split(" ")[1].slice(0, 5).split(":")[0];
        const stress = subItem.assessment;

        if (!tempData[time]) {
          tempData[time] = { sum: 0, count: 0 };
        }

        tempData[time].sum += stress;
        tempData[time].count++;
      });
    });

    for (const time in tempData) {
      if (tempData.hasOwnProperty(time)) {
        const averageStress = tempData[time].sum / tempData[time].count;
        newData.push({ value: averageStress, time: Number(time) });
      }
    }

    setassessmentData(newData);
  }, [moodscale]);

  useEffect(() => {
    getStressData();
    getAsessmentData();
  }, [getStressData, getAsessmentData]);

  return (
    <div className={styles.Diary}>
      {calendar ? (
        <>
          <div className={styles.Top}>
            <CloseIcon
              className={styles.CloseIcon}
              onClick={() => setCalendar(false)}
            />

            <p>Сегодня</p>
          </div>

          <h6>{new Date().getFullYear()}</h6>

          <div className={styles.Clanedar}>
            {Array.from({ length: 12 }, (_, month) => (
              <div key={month} className={styles.ClanedarItem}>
                <h5>{new Date().getFullYear()}</h5>
                <h3>{getMonthName(month)}</h3>
                <div className={styles.Month}>
                  {renderDays(month, new Date().getFullYear())}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={styles.Top}>
            <ArrowLeftIcon onClick={() => navigate("/")} />

            <p>
              {day} {months[month]} {hour}:{minutes}
            </p>

            <Calendar2Icon className={styles.Calendar2Icon} />
          </div>

          <div className={styles.Tabs}>
            {tabs.map((t, index) => (
              <div
                key={index}
                className={t.name === tab ? styles.ActiveTab : ""}
                onClick={() => setTab(t.name)}
              >
                <t.icon />
                {t.name}
              </div>
            ))}
          </div>

          {tab === "Дневник настроения" ? (
            <>
              <div className={styles.Block}>
                <h2>Что чувствуешь?</h2>
                <div className={`${styles.Items} ${styles.Emotions}`}>
                  {items.map((item, index) => (
                    <div
                      className={
                        emotion === item.name || activeNameFeeling.includes(item.name) ? styles.ActiveFeel : ""
                      }
                      key={index}
                      onClick={() => setEmotion(item.name as any)}
                    >
                      <img src={item.image} alt="" />
                      {item.name}
                    </div>
                  ))}
                </div>

                <div className={styles.AdditionalItems}>
                  {addItems[
                    addItems.findIndex((i) => i.name === emotion)
                  ].array.map((item, index) => (
                    <div
                      className={`${howFeel.includes(item) ? styles.ActiveFeel : ""
                        } ${emotion === "Радость"
                          ? styles.Orange
                          : emotion === "Страх"
                            ? styles.Yellow
                            : emotion === "Бешенство"
                              ? styles.Green
                              : emotion === "Грусть"
                                ? styles.Turquoise
                                : emotion === "Сила"
                                  ? styles.Blue
                                  : emotion === "Спокойствие"
                                    ? styles.Turquoise
                                    : ""
                        }`}
                      onClick={() => {
                        selectFeel(item)
                        setActiveNameFeeling(prev => activeNameFeeling.includes(addItems[addItems.findIndex((i) => i.name === emotion)].name) ? [...prev] : [...prev, addItems[addItems.findIndex((i) => i.name === emotion)].name])
                      }}
                      key={index}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.Block}>
                <h2>Уровень стресса</h2>
                <Range
                  setValue={setStress}
                  value={stress}
                  array={["Низкий", "Высокий"]}
                />
              </div>

              <div className={styles.Block}>
                <h2>Самооценка</h2>
                <Range
                  setValue={setSeltRate}
                  value={selfRate}
                  array={["Неуверенность", "Уверенность"]}
                />
              </div>

              <div className={styles.Block}>
                <h2>Заметки</h2>
                <textarea
                  placeholder="Заметка о вашем состоянии"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={styles.Textarea}
                ></textarea>
              </div>

              <ButtonDefault disabled={false} onClick={() => saveFeeling()}>
                Сохранить
              </ButtonDefault>
            </>
          ) : (
            <>
              <div className={styles.Tabs}>
                {tabs2.map((t, index) => (
                  <div
                    key={index}
                    className={t === tab2 ? styles.ActiveTab : ""}
                    onClick={() => setTab2(t)}
                  >
                    {t}
                  </div>
                ))}
              </div>

              <div className={styles.Block}>
                <h2>Шкала настроения</h2>
                <MoodScale data={moodscale} />
              </div>

              <div className={styles.Block}>
                <h2>Уровень стресса</h2>
                <Chart array={stressData} tab2={tab2} />
              </div>

              <div className={styles.Block}>
                <h2>Самооценка</h2>
                <Chart array={assessmentData} tab2={tab2} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Diary;
