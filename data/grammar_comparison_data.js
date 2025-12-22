const grammarComparisonData = [
    // =========================================================
    // หมวดที่ ๑: สัญญาวิธาน (อักษรและบัญญัติเบื้องต้น)
    // =========================================================
    {
        topic: "ตารางที่ ๑. สนฺธิกปฺโป",
        formulas: [
    {
        kaccayana: {
            pali: "อตฺโถ อกฺขรสญฺญาโต",
            thai: "เนื้อความ อันรู้อได้ด้วยอักษร",
            desc: "อักษรเป็นเครื่องหมายให้รู้เนื้อความ ถ้ารู้อักษรก็รู้เนื้อความได้",
            ref: "กัจ. ๑"
        },
        moggallana: {
            pali: "อตฺถาทิปมกฺขรา",
            thai: "อักษรเป็นประธานของเนื้อความ เป็นต้น",
            desc: "อักษรเป็นใหญ่ เป็นประธาน ในการสื่อเนื้อความ",
            ref: "โมค. ๑/๑"
        },
        saddaniti: {
            pali: "อตฺโถ อกฺขรสญฺญาโต",
            thai: "เนื้อความ อันรู้อได้ด้วยอักษร",
            desc: "อธิบายพิสดาร ยกคาถาประกอบว่า 'อักษรวิบัติ เนื้อความก็วิบัติ'",
            ref: "สัท. ปท."
        }
    },
    {
        kaccayana: {
            pali: "อกฺขราปาทโย เอกจตฺตาลีสํ",
            thai: "อักษรทั้งหลาย มี อ เป็นต้น มี ๔๑ ตัว",
            desc: "กำหนดจำนวนอักษรบาลีสากล ๔๑ ตัว (สระ ๘ พยัญชนะ ๓๓)",
            ref: "กัจ. ๒"
        },
        moggallana: {
            pali: "อ อา อิ อี อุ อู เอ โอ - สรา",
            thai: "อ อา อิ อี อุ อู เอ โอ ชื่อว่า สระ",
            desc: "โมคคัลลานะนับสระ ๘ ตัว แต่นับพยัญชนะเพิ่มเป็น ๓๕ (เพิ่ม ศ ษ ฯลฯ ในสันสกฤตบ้าง)",
            ref: "โมค. ๑/๒"
        },
        saddaniti: {
            pali: "เต จตฺตาลีสํ",
            thai: "อักษรเหล่านั้น มี ๔๐ บ้าง (มติอื่น)",
            desc: "สัททนีติรวบรวมมติหลากหลาย ทั้ง ๔๑, ๔๓ (เพิ่ม ฤ ฤา) และอธิบายละเอียดสุด",
            ref: "สัท. ปท."
        }
    },
    {
        kaccayana: {
            pali: "ตตฺโถทนฺตา สรา อฏฺฐ",
            thai: "ในอักษรเหล่านั้น อักษรสุดที่ โอ ชื่อว่า สระ มี ๘ ตัว",
            desc: "คือ อ อา อิ อี อุ อู เอ โอ",
            ref: "กัจ. ๓"
        },
        moggallana: {
            pali: "อ อา อิ อี อุ อู เอ โอ - สรา",
            thai: "อ อา อิ อี อุ อู เอ โอ ชื่อว่า สระ",
            desc: "ระบุชื่อสระโดยตรง",
            ref: "โมค. ๑/๒"
        },
        saddaniti: {
            pali: "สรา",
            thai: "ชื่อว่า สระ",
            desc: "เพราะทำพยัญชนะให้ออกเสียงได้ (สรนฺติ)",
            ref: "สัท. ปท."
        }
    },
    {
        kaccayana: {
            pali: "ลหุมตฺตา ตโย รสฺสา",
            thai: "สระมีมาตราเบา ๓ ตัว ชื่อว่า รัสสะ",
            desc: "คือ อ อิ อุ",
            ref: "กัจ. ๔"
        },
        moggallana: {
            pali: "อกาลสฺสิตุ รสฺสา",
            thai: "อ อิ อุ ชื่อว่า รัสสะ",
            desc: "ใช้คำย่อ อ-กาล (เวลาเท่า อ)",
            ref: "โมค. ๑/๓"
        },
        saddaniti: {
            pali: "รสฺสา",
            thai: "ชื่อว่า รัสสะ",
            desc: "อธิบายเรื่องมาตราเวลา (๑ ดีดนิ้วมือ)",
            ref: "สัท. ปท."
        }
    },
    {
        kaccayana: {
            pali: "อญฺเญ ทีฆา",
            thai: "สระเหล่าอื่น (จากรัสสะ) ชื่อว่า ทีฆะ",
            desc: "คือ อา อี อู เอ โอ",
            ref: "กัจ. ๕"
        },
        moggallana: {
            pali: "อญฺเญ ทีฆา",
            thai: "เหล่าอื่น ชื่อว่า ทีฆะ",
            desc: "เหมือนกัจจายนะ",
            ref: "โมค. ๑/๔"
        },
        saddaniti: {
            pali: "ทีฆา",
            thai: "ชื่อว่า ทีฆะ",
            desc: "มีเสียงยาว ๒ มาตราขึ้นไป",
            ref: "สัท. ปท."
        }
    },
    {
        kaccayana: {
            pali: "เสสา พฺยญฺชนา",
            ref: "กัจ. ๖"
        }
    },
    {
        kaccayana: {
            pali: "วคฺคา ปญฺจปญฺจโส มนฺตา",
            ref: "กัจ. ๗"
        }
    },
    {
        kaccayana: {
            pali: "อํอิติ นิคฺคหีตํ",
            ref: "กัจ. ๘"
        }
    },
    {
        kaccayana: {
            pali: "อํ พฺยญฺชเน นิคฺคหีตํ",
            ref: "กัจ. ๓๐"
        }
    },
    {
        kaccayana: {
            pali: "วคฺคนฺตํ วา วคฺเค",
            ref: "กัจ. ๓๑"
        }
    },
    {
        kaccayana: {
            pali: "เอเห ญํ",
            ref: "กัจ. ๓๒"
        }
    },
    {
        kaccayana: {
            pali: "ส เย จ",
            ref: "กัจ. ๓๓"
        }
    },
    {
        kaccayana: {
            pali: "มทา สเร",
            ref: "กัจ. ๓๔"
        }
    },
    {
        kaccayana: {
            pali: "ย ว ม ท น ต ร ลา จาคมา",
            ref: "กัจ. ๓๕"
        }
    },
    {
        kaccayana: {
            pali: "กฺวจิ โอ พฺยญฺชเน",
            ref: "กัจ. ๓๖"
        }
    },
    {
        kaccayana: {
            pali: "นิคฺคหีตญฺจ",
            ref: "กัจ. ๓๗"
        }
    },
    {
        kaccayana: {
            pali: "กฺวจิ โลปํ",
            ref: "กัจ. ๓๘"
        }
    },
    {
        kaccayana: {
            pali: "พฺยญฺชเน จ",
            ref: "กัจ. ๓๙"
        }
    },
    {
        kaccayana: {
            pali: "ปโร วา สโร",
            ref: "กัจ. ๔๐"
        }
    },
    {
        kaccayana: {
            pali: "พฺยญฺชโน จ วิสญฺโญโค",
            ref: "กัจ. ๔๑"
        }
    },

    {
        padarupasiddhi: {
            ref: "ปท. ๓๔"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๔๗"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๔๙"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๕๐"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๕๑"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๕๒"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๕๓"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๕๔"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๕๕"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๕๖"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๕๗"
        }
    },
    {
        padarupasiddhi: {
            ref: "ปท. ๕๘"
        }
    }
]
    },
    // =========================================================
    // หมวดที่ ๒: สนธิ (การต่อศัพท์)
    // =========================================================
    {
        topic: "ตารางที่ ๑. สนฺธิกปฺโป",
        formulas: [
            {
                kaccayana: {
                    pali: "ปรสมญฺญา ปโยเค",
                    ref: "กัจ. ๙"
                },
                padarupasiddhi: {
                    ref: "ปท. ๑๑"
                }
            },
            {
                kaccayana: {
                    pali: "ปุพฺบมโธฐิตมสฺสรํ สเรน วิโยชเย",
                    ref: "กัจ. ๑๐"
                },
                padarupasiddhi: {
                    ref: "ปท. ๑๒"
                }
            },
            {
                kaccayana: {
                    pali: "นเย ปรํ ยุตฺเต",
                    ref: "กัจ. ๑๑"
                },
                padarupasiddhi: {
                    ref: "ปท. ๑๔"
                }
            },
            {
                kaccayana: {
                    pali: "สรา สเร โลปํ",
                    ref: "กัจ. ๑๒"
                },
                padarupasiddhi: {
                    ref: "ปท. ๑๓"
                },
                moggallana: {
                    pali: "สรา ลุตฺตา",
                    ref: "โมค. ๒/๑"
                },
                saddaniti: {
                    pali: "สรโลโป",
                    ref: "สัท. สนฺธิ"
                }
            },
            {
                kaccayana: {
                    pali: "วา ปโร อสรูปา",
                    ref: "กัจ. ๑๓"
                },
                padarupasiddhi: {
                    ref: "ปท. ๑๕"
                },
                moggallana: {
                    pali: "น เย ปรํ",
                    ref: "โมค. ๑/๑๑"
                },
                saddaniti: {
                    pali: "วาสรุปา",
                    ref: "สัท. สนฺธิ"
                }
            },
            {
                kaccayana: {
                    pali: "กฺวจาสวณฺณํ ลุตฺเต",
                    ref: "กัจ. ๑๔"
                },
                padarupasiddhi: {
                    ref: "ปท. ๑๖"
                }
            },
            {
                kaccayana: {
                    pali: "ทีฆํ",
                    ref: "กัจ. ๑๕"
                },
                padarupasiddhi: {
                    ref: "ปท. ๑๗"
                }
            },
            {
                kaccayana: {
                    pali: "ปุพฺโบ จ",
                    ref: "กัจ. ๑๖"
                },
                padarupasiddhi: {
                    ref: "ปท. ๑๘"
                }
            },
            {
                kaccayana: {
                    pali: "ยเมทนฺตสฺสาเดโส",
                    ref: "กัจ. ๑๗"
                },
                padarupasiddhi: {
                    ref: "ปท. ๑๙"
                }
            },
            {
                kaccayana: {
                    pali: "วโมดุทนฺตานํ",
                    ref: "กัจ. ๑๘"
                },
                padarupasiddhi: {
                    ref: "ปท. ๒๐"
                }
            },
            {
                kaccayana: {
                    pali: "สพฺโบ จํ ติ",
                    ref: "กัจ. ๑๙"
                },
                padarupasiddhi: {
                    ref: "ปท. ๒๒"
                }
            },
            {
                kaccayana: {
                    pali: "โท ธสฺส จ",
                    ref: "กัจ. ๒๐"
                },
                    padarupasiddhi: {
                    ref: "ปท. ๒๗"
                }
            },
            {
                kaccayana: {
                    pali: "อิวณฺโณ ยํ นวา",
                    ref: "กัจ. ๒๑"
                },
                padarupasiddhi: {
                    ref: "ปท. ๒๑"
                }
            },
            {
                kaccayana: {
                    pali: "เอวาทิสฺส ริ ปุพฺโบ จ รสฺโส",
                    ref: "กัจ. ๒๒"
                },
                padarupasiddhi: {
                    ref: "ปท. ๒๘"
                }
            },
            {
                kaccayana: {
                    pali: "สรา ปกติ พฺยญฺชเน",
                    ref: "กัจ. ๒๓"
                },
                padarupasiddhi: {
                    ref: "ปท. ๓๖"
                }
            },
            {
                kaccayana: {
                    pali: "สเร กฺวจิ",
                    ref: "กัจ. ๒๔"
                },
                padarupasiddhi: {
                    ref: "ปท. ๓๕"
                }
            },
            {
                kaccayana: {
                    pali: "ทีฆํ",
                    ref: "กัจ. ๒๕"
                },
                padarupasiddhi: {
                    ref: "ปท. ๓๗"
                }
            },
            {
                kaccayana: {
                    pali: "รสฺสํ",
                    ref: "กัจ. ๒๖"
                },
                padarupasiddhi: {
                    ref: "ปท. ๓๘"
                }
            },
            {
                kaccayana: {
                    pali: "โลปญฺจ ตตฺรากาโร",
                    ref: "กัจ. ๒๗"
                },
                padarupasiddhi: {
                    ref: "ปท. ๓๙"
                }
            },
            {
                kaccayana: {
                    pali: "ปรเทฺวภาโว ฐาเน",
                    ref: "กัจ. ๒๘"
                },
                padarupasiddhi: {
                    ref: "ปท. ๔๐"
                }
            },
            {
                kaccayana: {
                    pali: "วคฺเค โฆสาโฆสานํ ตติยปฐมา",
                    ref: "กัจ. ๒๙"
                },
                padarupasiddhi: {
                    ref: "ปท. ๔๒"
                }
            },
            {
                kaccayana: {
                    pali: "อํพฺยญฺชเน นิคฺคหิตํ",
                    thai: "เพราะพยัญชนะ แปลง อํ เป็น นิคหิต (มฺ)",
                    desc: "แปลง นิคหิต เป็น พยัญชนะที่สุดวรรค",
                    ref: "กัจ. ๓๑"
                },
                padarupasiddhi: {
                    pali: "วคฺคนฺตํ วา วคฺเค",
                    thai: "เพราะพยัญชนะวรรค แปลงนิคหิตเป็นที่สุดวรรคได้บ้าง",
                    desc: "เช่น สํ + ขาร = สงฺขาร",
                    ref: "ปท. ๔๐"
                },
                moggallana: {
                    pali: "วคฺเค วคฺคนฺตา",
                    thai: "ในเพราะวรรค แปลงเป็นที่สุดวรรค",
                    desc: "...",
                    ref: "โมค. ๒/๔๕"
                },
                saddaniti: {
                    pali: "นิคฺคหิตสฺส วคฺคนฺตตฺตํ",
                    thai: "ความเป็นที่สุดวรรค ของนิคหิต",
                    desc: "...",
                    ref: "สัท. สนฺธิ"
                }
            }
            ,
            {
                kaccayana: { pali: "อิติ สนฺธิกปฺเป จตุตฺโถ กณฺโฑ" },
                padarupasiddhi: { pali: "อิติ สนฺธิกปฺเป จตุตฺโถ กณฺโฑ" },
                moggallana: { pali: "อิติ สนฺธิกปฺเป จตุตฺโถ กณฺโฑ" },
                saddaniti: { pali: "อิติ สนฺธิกปฺเป จตุตฺโถ กณฺโฑ" }
            }
        ]
    },
    // =========================================================
    // หมวดที่ ๓: นาม (คำเรียกชื่อ)
    // =========================================================
    {
        topic: "ตารางที่ ๒. นามกปฺโป",
        formulas: [
            {
                kaccayana: {
                    pali: "ชินวจนยุตฺตํ หิ",
                    thai: "คำใดประกอบด้วยพุทธพจน์...",
                    desc: "นิยามของภาษาบาลี",
                    ref: "กัจ. ๕๒"
                },
                padarupasiddhi: {
                    pali: "อตฺถวโต นาม สลฺลิงฺคํ",
                    thai: "ศัพท์ที่มีเนื้อความ ชื่อว่า นาม พร้อมทั้งลิงค์",
                    desc: "นิยามคำว่า นาม",
                    ref: "ปท. ๔๖"
                },
                moggallana: {
                    pali: "ตฺยาที่หิ วิภตฺตีหิ นามํ",
                    thai: "ศัพท์ที่ประกอบด้วยวิภัตติ มี สิ เป็นต้น ชื่อว่า นาม",
                    desc: "...",
                    ref: "โมค. ๓/๑"
                },
                saddaniti: {
                    pali: "นามนฺติ ปริภาสา",
                    thai: "ชื่อว่า นาม (ปริภาษา)",
                    desc: "น้อมไปสู่เนื้อความ",
                    ref: "สัท. นาม"
                }
            },
            {
                kaccayana: {
                    pali: "ลิงฺคญฺจ निपฺปชฺชเต",
                    thai: "และลิงค์ ย่อมสำเร็จ...",
                    desc: "การบัญญัติเพศของคำศัพท์",
                    ref: "กัจ. ๕๓"
                },
                padarupasiddhi: {
                    pali: "สิ โย อํ โย...",
                    thai: "สิ โย, อํ โย, นา หิ...",
                    desc: "สูตรตั้งวิภัตติ ๑๔ ตัว",
                    ref: "ปท. ๔๘"
                },
                moggallana: {
                    pali: "สิ โย อํ โย...",
                    thai: "สิ โย, อํ โย...",
                    desc: "ตั้งวิภัตตินาม",
                    ref: "โมค. ๓/๒"
                },
                saddaniti: {
                    pali: "วิภตฺติโย",
                    thai: "วิภัตติทั้งหลาย",
                    desc: "...",
                    ref: "สัท. นาม"
                }
            }
        ]
    },
    // =========================================================
    // หมวดที่ ๔: การก (หน้าที่ของนาม)
    // =========================================================
    {
        topic: "ตารางที่ ๓. การกกปฺโป",
        formulas: [
            {
                kaccayana: {
                    pali: "โย กโรติ ส กตฺตา",
                    thai: "ผู้ใดทำ ผู้นั้นชื่อ กัตตา",
                    desc: "นิยามผู้กระทำ (Subject)",
                    ref: "กัจ. ๒๗๗"
                },
                padarupasiddhi: {
                    pali: "สยํ กตฺตา",
                    thai: "ผู้ทำเอง ชื่อกัตตา",
                    desc: "...",
                    ref: "ปท. ๒๖๕"
                },
                moggallana: {
                    pali: "กตฺตา สยํ",
                    thai: "ผู้ทำเอง ชื่อกัตตา",
                    desc: "...",
                    ref: "โมค. ๔/๑"
                },
                saddaniti: {
                    pali: "กตฺตา สยํ",
                    thai: "...",
                    desc: "...",
                    ref: "สัท. การก"
                }
            },
            {
                kaccayana: {
                    pali: "ยํ กโรติ ตํ กมฺมํ",
                    thai: "เขาทำสิ่งใด สิ่งนั้นชื่อ กัมม์",
                    desc: "นิยามสิ่งที่ถูกกระทำ (Object)",
                    ref: "กัจ. ๒๘๑"
                },
                padarupasiddhi: {
                    pali: "กมฺมํ",
                    thai: "ชื่อว่า กรรม",
                    desc: "สิ่งที่กริยาเข้าไปถึง",
                    ref: "ปท. ๒๖๙"
                },
                moggallana: {
                    pali: "กมฺมํ กริยํ",
                    thai: "สิ่งที่ถูกทำ ชื่อกรรม",
                    desc: "...",
                    ref: "โมค. ๔/๔"
                },
                saddaniti: {
                    pali: "กริยติติ กมฺมํ",
                    thai: "ชื่อว่ากรรม เพราะถูกกระทำ",
                    desc: "...",
                    ref: "สัท. การก"
                }
            }
        ]
    },
    // =========================================================
    // หมวดที่ ๕: สมาส (การย่อนามศัพท์)
    // =========================================================
    {
        topic: "ตารางที่ ๔. สมาสกปฺโป",
        formulas: [
            {
                kaccayana: {
                    pali: "นามานํ สมาโส ยุตฺตตฺโถ",
                    thai: "การย่อเข้ากันของนามที่มีเนื้อความเกี่ยวเนื่องกัน ชื่อสมาส",
                    desc: "นิยามสมาส",
                    ref: "กัจ. ๓๑๘"
                },
                padarupasiddhi: {
                    pali: "นามานํ สมาโส ยุตฺตตฺโถ",
                    thai: "การย่อเข้ากันของนามที่มีเนื้อความเกี่ยวเนื่องกัน ชื่อสมาส",
                    desc: "เหมือนกัจจายนะ",
                    ref: "ปท. ๓๓๒"
                },
                moggallana: {
                    pali: "สมาโส",
                    thai: "ชื่อว่า สมาส",
                    desc: "การย่อศัพท์",
                    ref: "โมค. ๕/๑"
                },
                saddaniti: {
                    pali: "สมาโสติ",
                    thai: "ชื่อว่า สมาส",
                    desc: "...",
                    ref: "สัท. สมาส"
                }
            },
            {
                kaccayana: {
                    pali: "เตสํ วิภตฺติโย โลปา จ",
                    thai: "และให้ลบวิภัตติของนามเหล่านั้น",
                    desc: "กฎสำคัญของสมาสคือต้องลบวิภัตติท่ามกลาง",
                    ref: "กัจ. ๓๒๐"
                },
                padarupasiddhi: {
                    pali: "เตสํ วิภตฺติโย โลปา จ",
                    thai: "ลบวิภัตติของนามเหล่านั้น",
                    desc: "เหมือนกัจจายนะ",
                    ref: "ปท. ๓๓๓"
                },
                moggallana: {
                    pali: "ลุตฺตา สมาเส",
                    thai: "วิภัตติทั้งหลาย ลบแล้วในสมาส",
                    desc: "...",
                    ref: "โมค. ๕/๒"
                },
                saddaniti: {
                    pali: "วิภตฺติโลโป",
                    thai: "การลบวิภัตติ",
                    desc: "...",
                    ref: "สัท. สมาส"
                }
            }
        ]
    },
    // =========================================================
    // หมวดที่ ๖: ตัทธิต (ปัจจัยแทนศัพท์)
    // =========================================================
    {
        topic: "ตารางที่ ๕. ตทฺธิตกปฺโป",
        formulas: [
            {
                kaccayana: {
                    pali: "วุตฺตตฺถานมปฺปยุุตฺโต",
                    thai: "ตัทธิต ใช้แทนศัพท์ที่กล่าวแล้ว...",
                    desc: "นิยามตัทธิต",
                    ref: "กัจ. ๓๕๑"
                },
                padarupasiddhi: {
                    pali: "สามสฺสปจฺจ",
                    thai: "ลง ณ ปัจจัย ในอรรถเหล่ากอ...",
                    desc: "โคตตตัทธิต",
                    ref: "ปท. ๓๘๔"
                },
                moggallana: {
                    pali: "อญฺญตฺถ ตทฺธิโต",
                    thai: "ตัทธิต ลงในอรรถอื่น",
                    desc: "...",
                    ref: "โมค. ๖/๑"
                },
                saddaniti: {
                    pali: "ตทฺธิโต",
                    thai: "ชื่อว่า ตัทธิต",
                    desc: "เพราะเกื้อกูลแก่เนื้อความนั้น",
                    ref: "สัท. ตทฺธิต"
                }
            }
        ]
    },
    // =========================================================
    // หมวดที่ ๗: อาขยาต (กิริยาศัพท์)
    // =========================================================
    {
        topic: "ตารางที่ ๖. อาขฺยาตกปฺโป",
        formulas: [
            {
                kaccayana: {
                    pali: "วิภตฺติโย นาม",
                    thai: "ชื่อว่า วิภัตติ (แจก)",
                    desc: "...",
                    ref: "กัจ. ๔๐๗"
                },
                padarupasiddhi: {
                    pali: "วตฺตมานา ปจฺจุปฺปนฺเน",
                    thai: "วัตตมานาวิภัตติ ลงในปัจจุบันกาล",
                    desc: "สูตรลงวิภัตติหมวดแรก",
                    ref: "ปท. ๔๑๕"
                },
                moggallana: {
                    pali: "วตฺตมานา ปจฺจุปฺปนฺเน",
                    thai: "วัตตมานา ลงในปัจจุบันกาล",
                    desc: "...",
                    ref: "โมค. ๗/๑"
                },
                saddaniti: {
                    pali: "กาลวเสน ติวิธา",
                    thai: "วิภัตติมี ๓ อย่าง ด้วยอำนาจกาล",
                    desc: "ปัจจุบัน, อดีต, อนาคต",
                    ref: "สัท. อาขฺยาต"
                }
            },
            {
                kaccayana: {
                    pali: "กาเล วตฺตมานา...",
                    thai: "วัตตมานา ในกาล...",
                    desc: "...",
                    ref: "กัจ. ๔๑๒"
                },
                padarupasiddhi: {
                    pali: "ปญฺจมี อตฺตนิ",
                    thai: "ปัญจมีวิภัตติ ลงในอรรถบังคับ ความหวัง...",
                    desc: "บอกความบังคับ (จง, เถิด, ขอจง)",
                    ref: "ปท. ๔๑๖"
                },
                moggallana: {
                    pali: "วิธินิมนฺตนาทีสุ ปญฺจมี",
                    thai: "ปัญจมี ลงในอรรถชักชวน ฯลฯ",
                    desc: "...",
                    ref: "โมค. ๗/๕"
                },
                saddaniti: {
                    pali: "ปญฺจมี",
                    thai: "...",
                    desc: "...",
                    ref: "สัท. อาขฺยาต"
                }
            }
        ]
    },
    // =========================================================
    // หมวดที่ ๘: กิตก์ (นามกิตก์-กิริยากิตก์)
    // =========================================================
    {
        topic: "ตารางที่ ๗. กิพฺพิธานกปฺโป",
        formulas: [
            {
                kaccayana: {
                    pali: "กิตา กิพฺพิธานา",
                    thai: "วิธีของกิตก์...",
                    desc: "...",
                    ref: "กัจ. ๕๒๔"
                },
                padarupasiddhi: {
                    pali: "ธาตุยา กมฺมาทิมฺหิ ณ",
                    thai: "ลง ณ ปัจจัย หลังธาตุ ในอรรถกรรมเป็นต้น",
                    desc: "กฎนามกิตก์",
                    ref: "ปท. ๕๕๓"
                },
                moggallana: {
                    pali: "ธาตุปจฺจเยหิ กิตา",
                    thai: "กิตก์ สำเร็จด้วยธาตุและปัจจัย",
                    desc: "...",
                    ref: "โมค. ๘/๑"
                },
                saddaniti: {
                    pali: "กิตโก",
                    thai: "...",
                    desc: "...",
                    ref: "สัท. กิตก"
                }
            }
        ]
    }
];

const akhyataTable6Data = [
    {
        topic: "ตารางที่ ๖. อาขฺยาตกปฺโป",
        formulas: [
            { kaccayana: { pali: "อถ ปุพฺพานิ วิภตฺตีนํ ฉ ปรสฺสปทานิ.", ref: "กัจ. ๔๐๖" }, padarupasiddhi: { ref: "ปท. ๔๒๙" } },
            { kaccayana: { pali: "ปราณฺยตฺตโนปทานิ.", ref: "กัจ. ๔๐๗" }, padarupasiddhi: { ref: "ปท. ๔๓๙" } },
            { kaccayana: { pali: "เทฺว เทฺว ปฐมมชฺฌิมุตฺตมปุริสา.", ref: "กัจ. ๔๐๘" }, padarupasiddhi: { ref: "ปท. ๔๓๑" } },
            { kaccayana: { pali: "สพฺเพสเมกาภิธาเน ปโร ปุริโส.", ref: "กัจ. ๔๐๙" }, padarupasiddhi: { ref: "ปท. ๔๔๑" } },
            { kaccayana: { pali: "นามมฺหิ ปยุชฺชมาเนปิ ตุลฺยาธิกรเณ ปฐโม.", ref: "กัจ. ๔๑๐" }, padarupasiddhi: { ref: "ปท. ๔๓๒" } },
            { kaccayana: { pali: "ตุมฺเห มชฺฌิโม.", ref: "กัจ. ๔๑๑" }, padarupasiddhi: { ref: "ปท. ๔๓๖" } },
            { kaccayana: { pali: "อมฺเห อุตฺตโม.", ref: "กัจ. ๔๑๒" }, padarupasiddhi: { ref: "ปท. ๔๓๗" } },
            { kaccayana: { pali: "กาเล.", ref: "กัจ. ๔๑๓" }, padarupasiddhi: { ref: "ปท. ๔๒๖" } },
            { kaccayana: { pali: "วตฺตมานา ปจฺจุปฺปนฺเน.", ref: "กัจ. ๔๑๔" }, padarupasiddhi: { ref: "ปท. ๔๒๘" } },
            { kaccayana: { pali: "อาณตฺยาสิฏฺเฐนุตฺตกาเล ปญฺจมี.", ref: "กัจ. ๔๑๕" }, padarupasiddhi: { ref: "ปท. ๔๕๑" } },
            { kaccayana: { pali: "อนุมติปริกปฺปตฺเถสุ สตฺตมี.", ref: "กัจ. ๔๑๖" }, padarupasiddhi: { ref: "ปท. ๔๕๔" } },
            { kaccayana: { pali: "อปจฺจกฺเข ปโรกฺขาตีเต.", ref: "กัจ. ๔๑๗" }, padarupasiddhi: { ref: "ปท. ๔๖๐" } },
            { kaccayana: { pali: "หิยฺโยปภุติ ปจฺจกฺเข หิยฺยตฺตนี.", ref: "กัจ. ๔๑๘" }, padarupasiddhi: { ref: "ปท. ๔๕๖" } },
            { kaccayana: { pali: "สมีเปชฺชตนี.", ref: "กัจ. ๔๑๙" }, padarupasiddhi: { ref: "ปท. ๔๖๙" } },
            { kaccayana: { pali: "มาโยเค สพฺพกาเล จ.", ref: "กัจ. ๔๒๐" }, padarupasiddhi: { ref: "ปท. ๔๗๑" } },
            { kaccayana: { pali: "อนาคเต ภวิสฺสนฺตี.", ref: "กัจ. ๔๒๑" }, padarupasiddhi: { ref: "ปท. ๔๗๓" } },
            { kaccayana: { pali: "กฺริยาติปนฺเนตีเต กาลาติปตฺติ.", ref: "กัจ. ๔๒๒" }, padarupasiddhi: { ref: "ปท. ๔๗๕" } },
            { kaccayana: { pali: "วตฺตมานา ติ อนฺติ, สิ ถ, มิ ม, เต อนฺเต, เส เวฺห, เอ เมฺห.", ref: "กัจ. ๔๒๓" }, padarupasiddhi: { ref: "ปท. ๔๒๖" } },
            { kaccayana: { pali: "ปญฺจมี ตุ อนฺตุ, หิ ถ, มิ ม, ตํ อนฺตํ, สฺสุ โวฺห, เอ อามเส.", ref: "กัจ. ๔๒๔" }, padarupasiddhi: { ref: "ปท. ๔๕๐" } },
            { kaccayana: { pali: "สตฺตมี เอยฺย เอยฺยุํ, เอยฺยาสิ เอยฺยาถ, เอยฺยามิ เอยฺยาม, เอถ เอรํ, เอโถ เอยฺยาโวฺห, เอยฺยํ เอยฺยาเมฺห.", ref: "กัจ. ๔๒๕" }, padarupasiddhi: { ref: "ปท. ๔๕๓" } },
            { kaccayana: { pali: "ปโรกฺขา อ อุ, เอ ตฺถ, อํ มฺห, ตฺถ เร, ตฺโถ โวฺห, อึ เมฺห.", ref: "กัจ. ๔๒๖" }, padarupasiddhi: { ref: "ปท. ๔๕๙" } },
            { kaccayana: { pali: "หิยฺยตฺตนี อา อู, โอ ตฺถ, อํ มฺหา, ตฺถ ตฺถุํ, เส วฺหํ, อึ มฺหเส.", ref: "กัจ. ๔๒๗" }, padarupasiddhi: { ref: "ปท. ๔๕๕" } },
            { kaccayana: { pali: "อชฺชตนี อี อุํ, โอ ตฺถ, อึ มฺหา, อา อู, เส วฺหํ, อํ เมฺห.", ref: "กัจ. ๔๒๘" }, padarupasiddhi: { ref: "ปท. ๔๖๘" } },
            { kaccayana: { pali: "ภวิสฺสนฺตี สฺสติ สฺสนฺติ, สฺสสิ สฺสถ, สฺสามิ สฺสาม, สฺสเต สฺสนฺเต, สฺสเส สฺสเวฺห, สฺสํ สฺสาเมฺห.", ref: "กัจ. ๔๒๙" }, padarupasiddhi: { ref: "ปท. ๔๗๒" } },
            { kaccayana: { pali: "กาลาติปตฺติ สฺสา สฺสํสุ, สฺเส สฺสถ, สฺสํ สฺสามฺหา, สฺสถ สฺสิสุ, สฺสเส สฺสเวฺห, สฺสึ สฺสามฺหเส.", ref: "กัจ. ๔๓๐" }, padarupasiddhi: { ref: "ปท. ๔๗๔" } },
            { kaccayana: { pali: "หิยฺยตฺตนี สตฺตมี ปญฺจมี วตฺตมานา สพฺพธาตุกํ.", ref: "กัจ. ๔๓๑" }, padarupasiddhi: { ref: "ปท. ๔๕๘" } },
            { kaccayana: { pali: "อิติ อาขฺยาตกปฺเป ปฐโม กณฺโฑ." } },
            
            { kaccayana: { pali: "ธาตุลิงฺเคหิ ปรา ปจฺจยา.", ref: "กัจ. ๔๓๒" }, padarupasiddhi: { ref: "ปท. ๓๖๒" } },
            { kaccayana: { pali: "ติช คุป กิต มาเนหิ ข ฉ สา วา.", ref: "กัจ. ๔๓๓" }, padarupasiddhi: { ref: "ปท. ๕๒๘" } },
            { kaccayana: { pali: "ภุช ฆส หร สุ ปาทีหิ ตุมิจฺฉตฺเถสุ.", ref: "กัจ. ๔๓๔" }, padarupasiddhi: { ref: "ปท. ๕๓๔" } },
            { kaccayana: { pali: "อาย นามโต กตฺตูปมานาทาจาเร.", ref: "กัจ. ๔๓๕" }, padarupasiddhi: { ref: "ปท. ๕๓๖" } },
            { kaccayana: { pali: "อียูปมานา จ.", ref: "กัจ. ๔๓๖" }, padarupasiddhi: { ref: "ปท. ๕๓๗" } },
            { kaccayana: { pali: "นามมฺหาตฺติจฺฉตฺเถ.", ref: "กัจ. ๔๓๗" }, padarupasiddhi: { ref: "ปท. ๕๓๘" } },
            { kaccayana: { pali: "ธาตูหิ เณ ณย ณาเป ณาปยา การิตานิ เหตฺวตฺเถ.", ref: "กัจ. ๔๓๘" }, padarupasiddhi: { ref: "ปท. ๕๔๐" } },
            { kaccayana: { pali: "ธาตุรูเป นามสฺมา ณโย จ.", ref: "กัจ. ๔๓๙" }, padarupasiddhi: { ref: "ปท. ๕๓๙" } },
            { kaccayana: { pali: "ภาวกมฺเมสุ โย.", ref: "กัจ. ๔๔๐" }, padarupasiddhi: { ref: "ปท. ๕๔๕" } },
            { kaccayana: { pali: "ตสฺส จวคฺคยการวการตฺตํ สธาตฺวนฺตสฺส.", ref: "กัจ. ๔๔๑" }, padarupasiddhi: { ref: "ปท. ๔๔๗" } },
            { kaccayana: { pali: "อิวณฺณาคโม วา.", ref: "กัจ. ๔๔๒" }, padarupasiddhi: { ref: "ปท. ๔๔๘" } },
            { kaccayana: { pali: "ปุพฺพรูปญฺจ.", ref: "กัจ. ๔๔๓" }, padarupasiddhi: { ref: "ปท. ๔๔๙" } },
            { kaccayana: { pali: "ตถา กตฺตริ จ.", ref: "กัจ. ๔๔๔" }, padarupasiddhi: { ref: "ปท. ๕๑๑" } },
            { kaccayana: { pali: "ภูวาทิโต อ.", ref: "กัจ. ๔๔๕" }, padarupasiddhi: { ref: "ปท. ๔๓๓" } },
            { kaccayana: { pali: "รุธาทิโต นิคฺคหีตปุพฺพญฺจ.", ref: "กัจ. ๔๔๖" }, padarupasiddhi: { ref: "ปท. ๕๐๙" } },
            { kaccayana: { pali: "ทิวาทิโต โย.", ref: "กัจ. ๔๔๗" }, padarupasiddhi: { ref: "ปท. ๕๑๐" } },
            { kaccayana: { pali: "สฺวาทิโต ณุ ณา อุณา จ.", ref: "กัจ. ๔๔๘" }, padarupasiddhi: { ref: "ปท. ๕๑๒" } },
            { kaccayana: { pali: "กิยาทิโต นา.", ref: "กัจ. ๔๔๙" }, padarupasiddhi: { ref: "ปท. ๕๑๓" } },
            { kaccayana: { pali: "คหาทิโต ปฺป ณฺหา.", ref: "กัจ. ๔๕๐" }, padarupasiddhi: { ref: "ปท. ๕๑๗" } },
            { kaccayana: { pali: "ตนาทิโต โอ ยิรา.", ref: "กัจ. ๔๕๑" }, padarupasiddhi: { ref: "ปท. ๕๒๐" } },
            { kaccayana: { pali: "จุราทิโต เณ ณยา.", ref: "กัจ. ๔๕๒" }, padarupasiddhi: { ref: "ปท. ๕๒๕" } },
            { kaccayana: { pali: "อตฺตโนปทานิ ภาเว จ กมฺมนิ.", ref: "กัจ. ๔๕๓" }, padarupasiddhi: { ref: "ปท. ๔๔๔" } },
            { kaccayana: { pali: "กตฺตริ จ.", ref: "กัจ. ๔๕๔" }, padarupasiddhi: { ref: "ปท. ๔๔๐" } },
            { kaccayana: { pali: "ธาตุปฺปจฺจเยหิ วิภตฺติโย.", ref: "กัจ. ๔๕๕" }, padarupasiddhi: { ref: "ปท. ๕๓๐" } },
            { kaccayana: { pali: "กตฺตริ ปรสฺสปทํ.", ref: "กัจ. ๔๕๖" }, padarupasiddhi: { ref: "ปท. ๔๓๐" } },
            { kaccayana: { pali: "ภูวาทโย ธาตโว.", ref: "กัจ. ๔๕๗" }, padarupasiddhi: { ref: "ปท. ๔๒๔" } },
            { kaccayana: { pali: "อิติ อาขฺยาตกปฺเป ทุติโย กณฺโฑ." } },

            { kaccayana: { pali: "กฺวจาทิวณฺณานเมกสฺสรานํ เทฺวภาโว.", ref: "กัจ. ๔๕๘" }, padarupasiddhi: { ref: "ปท. ๔๖๑" } },
            { kaccayana: { pali: "ปุพฺโพพฺภาโส.", ref: "กัจ. ๔๕๙" }, padarupasiddhi: { ref: "ปท. ๔๖๒" } },
            { kaccayana: { pali: "รสฺโส.", ref: "กัจ. ๔๖๐" }, padarupasiddhi: { ref: "ปท. ๕๐๖" } },
            { kaccayana: { pali: "ทุติยจตุตฺถานํ ปฐมตติยา.", ref: "กัจ. ๔๖๑" }, padarupasiddhi: { ref: "ปท. ๔๖๔" } },
            { kaccayana: { pali: "กวคฺคสฺส จวคฺโค.", ref: "กัจ. ๔๖๒" }, padarupasiddhi: { ref: "ปท. ๔๖๗" } },
            { kaccayana: { pali: "มานกิตานํ วตตฺตํ วา.", ref: "กัจ. ๔๖๓" }, padarupasiddhi: { ref: "ปท. ๕๓๒" } },
            { kaccayana: { pali: "หสฺส โช.", ref: "กัจ. ๔๖๔" }, padarupasiddhi: { ref: "ปท. ๕๐๔" } },
            { kaccayana: { pali: "อนฺตสฺสิวณฺณากาโร วา.", ref: "กัจ. ๔๖๕" }, padarupasiddhi: { ref: "ปท. ๔๖๓" } },
            { kaccayana: { pali: "นิคฺคหีตญฺจ.", ref: "กัจ. ๔๖๖" }, padarupasiddhi: { ref: "ปท. ๔๘๙" } },
            { kaccayana: { pali: "ตโต ปามานานํ วามํ เสสุ.", ref: "กัจ. ๔๖๗" }, padarupasiddhi: { ref: "ปท. ๕๓๓" } },
            { kaccayana: { pali: "ฐา ติฏฺโฐ.", ref: "กัจ. ๔๖๘" }, padarupasiddhi: { ref: "ปท. ๔๙๒" } },
            { kaccayana: { pali: "ปา ปิโว.", ref: "กัจ. ๔๖๙" }, padarupasiddhi: { ref: "ปท. ๔๙๔" } },
            { kaccayana: { pali: "ญาสฺส ชาชํนา.", ref: "กัจ. ๔๗๐" }, padarupasiddhi: { ref: "ปท. ๕๑๔" } },
            { kaccayana: { pali: "ทิสสฺส ปสฺส ทิสฺส ทกฺขา วา.", ref: "กัจ. ๔๗๑" }, padarupasiddhi: { ref: "ปท. ๔๘๓" } },
            { kaccayana: { pali: "พฺยญฺชนนฺตสฺส โจ ฉปฺปจฺจเยสุ จ.", ref: "กัจ. ๔๗๒" }, padarupasiddhi: { ref: "ปท. ๕๓๑" } },
            { kaccayana: { pali: "โก เข จ.", ref: "กัจ. ๔๗๓" }, padarupasiddhi: { ref: "ปท. ๕๒๙" } },
            { kaccayana: { pali: "หรสฺส คี เส.", ref: "กัจ. ๔๗๔" }, padarupasiddhi: { ref: "ปท. ๕๓๕" } },
            { kaccayana: { pali: "พฺรูภูนมาหภูวา ปโรกฺขายํ.", ref: "กัจ. ๔๗๕" }, padarupasiddhi: { ref: "ปท. ๔๖๕" } },
            { kaccayana: { pali: "คมิสฺสนฺโต จฺโฉ วา สพฺพาสุ.", ref: "กัจ. ๔๗๖" }, padarupasiddhi: { ref: "ปท. ๔๔๒" } },
            { kaccayana: { pali: "วจสฺสชฺชตนิมฺหิ มกาโร โอ.", ref: "กัจ. ๔๗๗" }, padarupasiddhi: { ref: "ปท. ๔๗๙" } },
            { kaccayana: { pali: "อกาโร ทีฆํ หิมิเมสุ.", ref: "กัจ. ๔๗๘" }, padarupasiddhi: { ref: "ปท. ๔๓๘" } },
            { kaccayana: { pali: "หิ โลปํ วา.", ref: "กัจ. ๔๗๙" }, padarupasiddhi: { ref: "ปท. ๔๕๒" } },
            { kaccayana: { pali: "โหติสฺสเรโหเห ภวิสฺสนฺติมฺหิ สฺสสฺส จ.", ref: "กัจ. ๔๘๐" }, padarupasiddhi: { ref: "ปท. ๔๙๐" } },
            { kaccayana: { pali: "กรสฺส สปฺปจฺจยสฺส กาโห.", ref: "กัจ. ๔๘๑" }, padarupasiddhi: { ref: "ปท. ๕๒๔" } },
            { kaccayana: { pali: "อิติ อาขฺยาตกปฺเป ตติโย กณฺโฑ." } },

            { kaccayana: { pali: "ทาทนฺตสฺสํ มิเมสุ.", ref: "กัจ. ๔๘๒" }, padarupasiddhi: { ref: "ปท. ๕๐๘" } },
            { kaccayana: { pali: "อสํโยคนฺตสฺส วุทฺธิ การิเต.", ref: "กัจ. ๔๘๓" }, padarupasiddhi: { ref: "ปท. ๕๒๗" } },
            { kaccayana: { pali: "ฆฏาทีนํ วา.", ref: "กัจ. ๔๘๔" }, padarupasiddhi: { ref: "ปท. ๕๔๒" } },
            { kaccayana: { pali: "อญฺเญสุ จ.", ref: "กัจ. ๔๘๕" }, padarupasiddhi: { ref: "ปท. ๔๓๔" } },
            { kaccayana: { pali: "คุห ทุสานํ ทีฆํ.", ref: "กัจ. ๔๘๖" }, padarupasiddhi: { ref: "ปท. ๕๔๓" } },
            { kaccayana: { pali: "วจ วส วหาทีนมุกาโร วสฺส เย.", ref: "กัจ. ๔๘๗" }, padarupasiddhi: { ref: "ปท. ๔๗๘" } },
            { kaccayana: { pali: "หวิปริยโย โล วา.", ref: "กัจ. ๔๘๘" }, padarupasiddhi: { ref: "ปท. ๔๘๑" } },
            { kaccayana: { pali: "คหสฺส เฆ ปฺเป.", ref: "กัจ. ๔๘๙" }, padarupasiddhi: { ref: "ปท. ๕๑๙" } },
            { kaccayana: { pali: "หโลโป ณฺหามฺหิ.", ref: "กัจ. ๔๙๐" }, padarupasiddhi: { ref: "ปท. ๕๑๘" } },
            { kaccayana: { pali: "กรสฺส กาสตฺตมชฺชตนิมฺหิ.", ref: "กัจ. ๔๙๑" }, padarupasiddhi: { ref: "ปท. ๕๒๓" } },
            { kaccayana: { pali: "อสสฺมา มิมานํ มฺหิมฺหานฺตโลโป จ.", ref: "กัจ. ๔๙๒" }, padarupasiddhi: { ref: "ปท. ๔๙๙" } },
            { kaccayana: { pali: "ถสฺส ตฺถตฺตํ.", ref: "กัจ. ๔๙๓" }, padarupasiddhi: { ref: "ปท. ๔๙๘" } },
            { kaccayana: { pali: "ติสฺส ตฺถิตฺตํ.", ref: "กัจ. ๔๙๔" }, padarupasiddhi: { ref: "ปท. ๔๙๕" } },
            { kaccayana: { pali: "ตุสฺส ตฺถุตฺตํ.", ref: "กัจ. ๔๙๕" }, padarupasiddhi: { ref: "ปท. ๕๐๐" } },
            { kaccayana: { pali: "สิมฺหิ จ.", ref: "กัจ. ๔๙๖" }, padarupasiddhi: { ref: "ปท. ๔๙๗" } },
            { kaccayana: { pali: "ลภสฺมา อีอึนํ ตฺถตฺถํ.", ref: "กัจ. ๔๙๗" }, padarupasiddhi: { ref: "ปท. ๔๗๗" } },
            { kaccayana: { pali: "กุสสฺมา ที จฺฉิ.", ref: "กัจ. ๔๙๘" }, padarupasiddhi: { ref: "ปท. ๔๘๐" } },
            { kaccayana: { pali: "ทาธาตุสฺส ทชฺชํ.", ref: "กัจ. ๔๙๙" }, padarupasiddhi: { ref: "ปท. ๕๐๗" } },
            { kaccayana: { pali: "วทสฺส วชฺชํ.", ref: "กัจ. ๕๐๐" }, padarupasiddhi: { ref: "ปท. ๔๘๖" } },
            { kaccayana: { pali: "คมิสฺส ฆมฺมํ.", ref: "กัจ. ๕๐๑" }, padarupasiddhi: { ref: "ปท. ๔๔๓" } },
            { kaccayana: { pali: "ยมฺหิ ทา ธา มา ฐา หา ปา มห มถาทีนมี.", ref: "กัจ. ๕๐๒" }, padarupasiddhi: { ref: "ปท. ๔๙๓" } },
            { kaccayana: { pali: "ยชสฺสาทิสฺสิ.", ref: "กัจ. ๕๐๓" }, padarupasiddhi: { ref: "ปท. ๔๘๕" } },
            { kaccayana: { pali: "สพฺพโต อุํ อึสุ.", ref: "กัจ. ๕๐๔" }, padarupasiddhi: { ref: "ปท. ๔๗๐" } },
            { kaccayana: { pali: "ชรมรานํ ชีร ชิยฺย มิยฺยา วา.", ref: "กัจ. ๕๐๕" }, padarupasiddhi: { ref: "ปท. ๔๘๒" } },
            { kaccayana: { pali: "สพฺพตฺถาสสฺสาทิโลโป จ.", ref: "กัจ. ๕๐๖" }, padarupasiddhi: { ref: "ปท. ๔๙๖" } },
            { kaccayana: { pali: "อสพฺพธาตุเก ภู.", ref: "กัจ. ๕๐๗" }, padarupasiddhi: { ref: "ปท. ๕๐๑" } },
            { kaccayana: { pali: "เอยฺยสฺส ญาโต อิยา ญา.", ref: "กัจ. ๕๐๘" }, padarupasiddhi: { ref: "ปท. ๕๑๕" } },
            { kaccayana: { pali: "นาสฺส โลโป ยการตฺตํ.", ref: "กัจ. ๕๐๙" }, padarupasiddhi: { ref: "ปท. ๕๑๖" } },
            { kaccayana: { pali: "โลปญฺเจตฺตมกาโร.", ref: "กัจ. ๕๑๐" }, padarupasiddhi: { ref: "ปท. ๔๘๗" } },
            { kaccayana: { pali: "อุตฺตโมกาโร.", ref: "กัจ. ๕๑๑" }, padarupasiddhi: { ref: "ปท. ๕๒๑" } },
            { kaccayana: { pali: "กรสฺสากาโร จ.", ref: "กัจ. ๕๑๒" }, padarupasiddhi: { ref: "ปท. ๕๒๒" } },
            { kaccayana: { pali: "โอ อว สเร.", ref: "กัจ. ๕๑๓" }, padarupasiddhi: { ref: "ปท. ๔๓๕" } },
            { kaccayana: { pali: "เอ อย.", ref: "กัจ. ๕๑๔" }, padarupasiddhi: { ref: "ปท. ๔๙๑" } },
            { kaccayana: { pali: "เต อาวายา การิเต.", ref: "กัจ. ๕๑๕" }, padarupasiddhi: { ref: "ปท. ๕๔๑" } },
            { kaccayana: { pali: "อิการาคโม อสพฺพธาตุกมฺหิ.", ref: "กัจ. ๕๑๖" }, padarupasiddhi: { ref: "ปท. ๔๖๖" } },
            { kaccayana: { pali: "กฺวจิ ธาตุวิภตฺติปจฺจยานํ ทีฆวิปรีตาเทสโลปาคมา จ.", ref: "กัจ. ๕๑๗" }, padarupasiddhi: { ref: "ปท. ๔๘๘" } },
            { kaccayana: { pali: "อตฺตโนปทานิ ปรสฺสปทตฺตํ.", ref: "กัจ. ๕๑๘" }, padarupasiddhi: { ref: "ปท. ๔๔๖" } },
            { kaccayana: { pali: "อการาคโม หิยฺยตฺตนี อชฺชตนี กาลาติปตฺตีสุ.", ref: "กัจ. ๕๑๙" }, padarupasiddhi: { ref: "ปท. ๔๕๗" } },
            { kaccayana: { pali: "พฺรูโต อี ติมฺหิ.", ref: "กัจ. ๕๒๐" }, padarupasiddhi: { ref: "ปท. ๕๐๒" } },
            { kaccayana: { pali: "ธาตุสฺสนฺโต โลโปเนกสฺสรสฺส.", ref: "กัจ. ๕๒๑" }, padarupasiddhi: { ref: "ปท. ๔๒๕" } },
            { kaccayana: { pali: "อิสุยมูนมนฺโต จฺโฉ วา.", ref: "กัจ. ๕๒๒" }, padarupasiddhi: { ref: "ปท. ๔๗๖" } },
            { kaccayana: { pali: "การิตานํ โณ โลปํ.", ref: "กัจ. ๕๒๓" }, padarupasiddhi: { ref: "ปท. ๕๒๖" } },
            { kaccayana: { pali: "อิติ อาขฺยาตกปฺเป จตุตฺโถ กณฺโฑ." } },
            { kaccayana: { pali: "อาขฺยาตสุตฺตํ นิฏฺฐิตํ." } }
        ]
    }
];

const sandhiTable1Data = [
    {
        topic: "ตารางที่ ๑. สนฺธิกปฺโป",
        formulas: [
            {
                kaccayana: { pali: "อตฺโถ อกฺขรสญฺญาโต", ref: "กัจ. ๑" },
                padarupasiddhi: {
                    pali: "อตฺโถ อกฺขรสญฺญาโต",
                    thai: "เนื้อความ อันรู้อได้ด้วยอักษร",
                    desc: "เหมือนกัจจายนะ เป็นรากฐานการเรียนบาลี",
                    ref: "ปท. ๑"
                }
            },
            {
                kaccayana: { pali: "อกฺขราปาทโย เอกจตฺตาฬีสํ", ref: "กัจ. ๒" },
                padarupasiddhi: {
                    pali: "อกฺขราปาทโย เอกจตฺตาลีสํ.",
                    thai: "อักษรทั้งหลาย มี อ เป็นต้น มี ๔๑ ตัว",
                    desc: "ตามนัยกัจจายนะ",
                    ref: "ปท. ๒"
                }
            },
            {
                kaccayana: { pali: "ตตฺโถทนฺตา สรา อฏฺฐ", ref: "กัจ. ๓" },
                padarupasiddhi: {
                    pali: "ตตฺโถทนฺตา สรา อฏฺฐ.",
                    thai: "ในอักษรเหล่านั้น อักษรสุดที่ โอ ชื่อว่า สระ มี ๘ ตัว",
                    desc: "เหมือนกัจจายนะ",
                    ref: "ปท. ๓"
                }
            },
            {
                kaccayana: { pali: "ลหุมตฺตา ตโย รสฺสา", ref: "กัจ. ๔" },
                padarupasiddhi: {
                    pali: "ลหุมตฺตา ตโย รสฺสา.",
                    thai: "สระมีมาตราเบา ๓ ตัว ชื่อว่า รัสสะ",
                    desc: "เหมือนกัจจายนะ",
                    ref: "ปท. ๔"
                }
            },
            {
                kaccayana: { pali: "อญฺเญ ทีฆา", ref: "กัจ. ๕" },
                padarupasiddhi: {
                    pali: "อญฺเญ ทีฆา.",
                    thai: "สระเหล่าอื่น ชื่อว่า ทีฆะ",
                    desc: "เหมือนกัจจายนะ",
                    ref: "ปท. ๕"
                }
            },
            {
                padarupasiddhi: {
                    pali: "ทุมฺหิครุ.",
                    ref: "ปท. ๖"
                }
            },
            {
                padarupasiddhi: {
                    pali: "ทีโฆ จ.",
                    ref: "ปท. ๗"
                }
            },
            {
                kaccayana: { pali: "เสสา พฺยญฺชนา", ref: "กัจ. ๖" },
                padarupasiddhi: {
                    pali: "เสสา พฺยญฺชนา.",
                    ref: "ปท. ๘"
                }
            },
            {
                kaccayana: { pali: "วคฺคา ปญฺจปญฺจโส มนฺตา", ref: "กัจ. ๗" },
                padarupasiddhi: {
                    pali: "วคฺคา ปญฺจปญฺจโส มนฺตา.",
                    ref: "ปท. ๙"
                }
            },
            {
                kaccayana: { pali: "อํอิติ นิคฺคหีตํ", ref: "กัจ. ๘" },
                padarupasiddhi: {
                    pali: "อํอิตินิคฺคหีตํ.",
                    ref: "ปท. ๑๐"
                }
            },
            {
                kaccayana: { pali: "ปรสมญฺญา ปโยเค", ref: "กัจ. ๙" },
                padarupasiddhi: { ref: "ปท. ๑๑" }
            },
            {
                kaccayana: { pali: "ปุพฺบมโธฐิตมสฺสรํ สเรน วิโยชเย", ref: "กัจ. ๑๐" },
                padarupasiddhi: { ref: "ปท. ๑๒" }
            },
            {
                kaccayana: { pali: "นเย ปรํ ยุตฺเต", ref: "กัจ. ๑๑" },
                padarupasiddhi: {
                    pali: "นเย ปรํยุตฺเต.",
                    ref: "ปท. ๑๔"
                }
            },
            {
                kaccayana: { pali: "อิติ สนฺธิกปฺเป ปฐโม กณฺโฑ" },
                padarupasiddhi: { pali: "อิติ สนฺธิกปฺเป ปฐโม กณฺโฑ" },
                moggallana: { pali: "อิติ สนฺธิกปฺเป ปฐโม กณฺโฑ" },
                saddaniti: { pali: "อิติ สนฺธิกปฺเป ปฐโม กณฺโฑ" }
            },
            {
                kaccayana: { pali: "สรา สเร โลปํ", ref: "กัจ. ๑๒" },
                padarupasiddhi: { ref: "ปท. ๑๓" }
            },
            {
                kaccayana: { pali: "วา ปโร อสรูปา", ref: "กัจ. ๑๓" },
                padarupasiddhi: {
                    pali: "วา ปโร อสรูปา.",
                    ref: "ปท. ๑๕"
                }
            },
            {
                kaccayana: { pali: "กฺวจาสวณฺณํ ลุตฺเต", ref: "กัจ. ๑๔" },
                padarupasiddhi: {
                    pali: "กฺวจาสวณฺณํลุตฺเต.",
                    ref: "ปท. ๑๖"
                }
            },
            {
                kaccayana: { pali: "ทีฆํ", ref: "กัจ. ๑๕" },
                padarupasiddhi: {
                    pali: "ทีฆํ.",
                    ref: "ปท. ๑๗"
                }
            },
            {
                kaccayana: { pali: "ปุพฺโบ จ", ref: "กัจ. ๑๖" },
                padarupasiddhi: {
                    pali: "ปุพฺโพ จ.",
                    ref: "ปท. ๑๘"
                }
            },
            {
                kaccayana: { pali: "ยเมทนฺตสฺสาเดโส", ref: "กัจ. ๑๗" },
                padarupasiddhi: {
                    pali: "ยเมทนฺตสฺสาเทโส.",
                    ref: "ปท. ๑๙"
                }
            },
            {
                kaccayana: { pali: "วโมดุทนฺตานํ", ref: "กัจ. ๑๘" },
                padarupasiddhi: {
                    pali: "วโมทุทนฺตานํ.",
                    ref: "ปท. ๒๐"
                }
            },
            {
                kaccayana: { pali: "สพฺโบ จํ ติ", ref: "กัจ. ๑๙" },
                padarupasiddhi: {
                    pali: "สพฺโพ จนฺติ.",
                    ref: "ปท. ๒๒"
                }
            },
            {
                padarupasiddhi: {
                    pali: "อติสฺส จนฺตสฺส",
                    ref: "ปท. ๒๓"
                }
            },
            {
                padarupasiddhi: {
                    pali: "อพฺโภ อภิ.",
                    ref: "ปท. ๒๔"
                }
            },
            {
                padarupasiddhi: {
                    pali: "อชฺโฌ อธิ.",
                    ref: "ปท. ๒๕"
                }
            },
            {
                padarupasiddhi: {
                    pali: "เต น วา อิวณฺเณ.",
                    ref: "ปท. ๒๖"
                }
            },
            {
                kaccayana: { pali: "โท ธสฺส จ", ref: "กัจ. ๒๐" },
                padarupasiddhi: {
                    pali: "โท ธสฺส จ.",
                    ref: "ปท. ๒๗"
                }
            },
            {
                kaccayana: { pali: "อิวณฺโณ ยํ นวา", ref: "กัจ. ๒๑" },
                padarupasiddhi: {
                    pali: "อิวณฺโณ ยํนวา.",
                    ref: "ปท. ๒๑"
                }
            },
            {
                kaccayana: { pali: "เอวาทิสฺส ริ ปุพฺโบ จ รสฺโส", ref: "กัจ. ๒๒" },
                padarupasiddhi: {
                    pali: "เอวาทิสฺส ริปุพฺโพ จ รสฺโส.",
                    ref: "ปท. ๒๘"
                }
            },
            {
                padarupasiddhi: {
                    pali: "อิวณฺณุวณฺณา ฌลา.",
                    ref: "ปท. ๒๙"
                }
            },
            {
                padarupasiddhi: {
                    pali: "ฌลานมิยุวา สเร วา.",
                    ref: "ปท. ๓๐"
                }
            },
            {
                kaccayana: { pali: "อิติ สนฺธิกปฺเป ทุติโย กณฺโฑ" },
                padarupasiddhi: { pali: "อิติ สนฺธิกปฺเป ทุติโย กณฺโฑ" },
                moggallana: { pali: "อิติ สนฺธิกปฺเป ทุติโย กณฺโฑ" },
                saddaniti: { pali: "อิติ สนฺธิกปฺเป ทุติโย กณฺโฑ" }
            },
            {
                kaccayana: { pali: "สรา ปกติ พฺยญฺชเน", ref: "กัจ. ๒๓" },
                padarupasiddhi: { ref: "ปท. ๓๖" }
            },
            {
                kaccayana: { pali: "สเร กฺวจิ", ref: "กัจ. ๒๔" },
                padarupasiddhi: { ref: "ปท. ๓๕" }
            },
            {
                kaccayana: { pali: "ทีฆํ", ref: "กัจ. ๒๕" },
                padarupasiddhi: { ref: "ปท. ๓๗" }
            },
            {
                kaccayana: { pali: "รสฺสํ", ref: "กัจ. ๒๖" },
                padarupasiddhi: { ref: "ปท. ๓๘" }
            },
            {
                kaccayana: { pali: "โลปญฺจ ตตฺรากาโร", ref: "กัจ. ๒๗" },
                padarupasiddhi: { ref: "ปท. ๓๙" }
            },
            {
                kaccayana: { pali: "ปรเทฺวภาโว ฐาเน", ref: "กัจ. ๒๘" },
                padarupasiddhi: { ref: "ปท. ๔๐" }
            },
            {
                kaccayana: { pali: "วคฺเค โฆสาโฆสานํ ตติยปฐมา", ref: "กัจ. ๒๙" },
                padarupasiddhi: { ref: "ปท. ๔๒" }
            },
            {
                kaccayana: { pali: "อิติ สนฺธิกปฺเป ตติโย กณฺโฑ" },
                padarupasiddhi: { pali: "อิติ สนฺธิกปฺเป ตติโย กณฺโฑ" },
                moggallana: { pali: "อิติ สนฺธิกปฺเป ตติโย กณฺโฑ" },
                saddaniti: { pali: "อิติ สนฺธิกปฺเป ตติโย กณฺโฑ" }
            },
            {
                kaccayana: { pali: "อํ พฺยญฺชเน นิคฺคหีตํ", ref: "กัจ. ๓๐" },
                padarupasiddhi: { ref: "ปท. ๕๘" }
            },
            {
                kaccayana: { pali: "วคฺคนฺตํ วา วคฺเก", ref: "กัจ. ๓๑" },
                padarupasiddhi: { ref: "ปท. ๔๙" }
            },
            {
                kaccayana: { pali: "เอเห ญํ", ref: "กัจ. ๓๒" },
                padarupasiddhi: { ref: "ปท. ๕๐" }
            },
            {
                kaccayana: { pali: "ส เย จ", ref: "กัจ. ๓๓" },
                padarupasiddhi: { ref: "ปท. ๕๑" }
            },
            {
                kaccayana: { pali: "มทา สเร", ref: "กัจ. ๓๔" },
                padarupasiddhi: { ref: "ปท. ๕๒" }
            },
            {
                kaccayana: { pali: "ย ว ม ท น ต ร ลา จาคมา", ref: "กัจ. ๓๕" },
                padarupasiddhi: { ref: "ปท. ๓๔" }
            },
            {
                kaccayana: { pali: "กฺวจิ โอ พฺยญฺชเน", ref: "กัจ. ๓๖" },
                padarupasiddhi: { ref: "ปท. ๔๗" }
            },
            {
                kaccayana: { pali: "นิคฺคหีตญฺจ", ref: "กัจ. ๓๗" },
                padarupasiddhi: { ref: "ปท. ๕๗" }
            },
            {
                kaccayana: { pali: "กฺวจิ โลปํ", ref: "กัจ. ๓๘" },
                padarupasiddhi: { ref: "ปท. ๕๓" }
            },
            {
                kaccayana: { pali: "พฺยญฺชเน จ", ref: "กัจ. ๓๙" },
                padarupasiddhi: { ref: "ปท. ๕๔" }
            },
            {
                kaccayana: { pali: "ปโร วา สโร", ref: "กัจ. ๔๐" },
                padarupasiddhi: { ref: "ปท. ๕๕" }
            },
            {
                kaccayana: { pali: "พฺยญฺชโน จ วิสญฺโญโค", ref: "กัจ. ๔๑" },
                padarupasiddhi: { ref: "ปท. ๕๖" }
            },
            {
                kaccayana: { pali: "อิติ สนฺธิกปฺเป จตุตฺโถ กณฺโฑ" },
                padarupasiddhi: { pali: "อิติ สนฺธิกปฺเป จตุตฺโถ กณฺโฑ" },
                moggallana: { pali: "อิติ สนฺธิกปฺเป จตุตฺโถ กณฺโฑ" },
                saddaniti: { pali: "อิติ สนฺธิกปฺเป จตุตฺโถ กณฺโฑ" }
            },
            {
                kaccayana: { pali: "โค สเร ปุถสฺสาคโม กฺวจิ", ref: "กัจ. ๔๒" },
                padarupasiddhi: { ref: "ปท. ๓๒" }
            },
            {
                kaccayana: { pali: "ปาสฺส จนฺโต รสฺโส", ref: "กัจ. ๔๓" },
                padarupasiddhi: { ref: "ปท. ๓๓" }
            },
            {
                kaccayana: { pali: "อบฺโภ อภิ", ref: "กัจ. ๔๔" },
                padarupasiddhi: { ref: "ปท. ๒๔" }
            },
            {
                kaccayana: { pali: "อชฺโฌ อธิ", ref: "กัจ. ๔๕" },
                padarupasiddhi: { ref: "ปท. ๒๕" }
            },
            {
                kaccayana: { pali: "เต น วา อิวณฺเณ", ref: "กัจ. ๔๖" },
                padarupasiddhi: { ref: "ปท. ๒๖" }
            },
            {
                kaccayana: { pali: "อติสฺส จนฺตสฺส", ref: "กัจ. ๔๗" },
                padarupasiddhi: { ref: "ปท. ๒๓" }
            },
            {
                kaccayana: { pali: "กฺวจิ ปฏิ ปติสฺส", ref: "กัจ. ๔๘" },
                padarupasiddhi: { ref: "ปท. ๔๓" }
            },
            {
                kaccayana: { pali: "ปุถสฺสุ พฺยญฺชเน", ref: "กัจ. ๔๙" },
                padarupasiddhi: { ref: "ปท. ๔๔" }
            },
            {
                kaccayana: { pali: "โอ อวสฺส", ref: "กัจ. ๕๐" },
                padarupasiddhi: { ref: "ปท. ๔๕" }
            },
            {
                kaccayana: { pali: "อนุปทิฏฺฐานํ วุตฺตโยคโต", ref: "กัจ. ๕๑" },
                padarupasiddhi: { ref: "ปท. ๕๙" }
            },
            {
                kaccayana: { pali: "อิติ สนฺธิกปฺเป ปญฺจโม กณฺโฑ" },
                padarupasiddhi: { pali: "อิติ สนฺธิกปฺเป ปญฺจโม กณฺโฑ" },
                moggallana: { pali: "อิติ สนฺธิกปฺเป ปญฺจโม กณฺโฑ" },
                saddaniti: { pali: "อิติ สนฺธิกปฺเป ปญฺจโม กณฺโฑ" }
            },
            {
                kaccayana: { pali: "สนฺธิสุตฺตํ นิฏฺฐิตํ" },
                padarupasiddhi: { pali: "สนฺธิสุตฺตํ นิฏฺฐิตํ" },
                moggallana: { pali: "สนฺธิสุตฺตํ นิฏฺฐิตํ" },
                saddaniti: { pali: "สนฺธิสุตฺตํ นิฏฺฐิตํ" }
            }
        ]
    }
];

const namaTable2Data = [
    {
        topic: "ตารางที่ ๒. นามกปฺโป",
        formulas: [
            {
                kaccayana: { pali: "ชินวจนยุตฺตํ หิ", ref: "กัจ. ๕๒" },
                padarupasiddhi: { ref: "ปท. ๖๐" }
            },
            {
                kaccayana: { pali: "ลิงฺคญฺจ นิปจฺจเต", ref: "กัจ. ๕๓" },
                padarupasiddhi: { ref: "ปท. ๖๑" }
            },
            {
                kaccayana: { pali: "ตโต จ วิภตฺติโย", ref: "กัจ. ๕๔" },
                padarupasiddhi: { ref: "ปท. ๖๒" }
            },
            {
                kaccayana: { pali: "สิ โย, อํ โย, นา หิ, ส นํ, สฺมา หิ, ส นํ, สฺมึ สุ", ref: "กัจ. ๕๕" },
                padarupasiddhi: { ref: "ปท. ๖๓" }
            },
            {
                kaccayana: { pali: "ตทนุปโรเธน", ref: "กัจ. ๕๖" },
                padarupasiddhi: { ref: "ปท. ๖๔" }
            },
            {
                kaccayana: { pali: "อาลปเน สิ คสญฺโญ", ref: "กัจ. ๕๗" },
                padarupasiddhi: { ref: "ปท. ๗๑" }
            },
            {
                kaccayana: { pali: "อิวณฺณุวณฺณา ฌลา", ref: "กัจ. ๕๘" },
                padarupasiddhi: { ref: "ปท. ๒๙" }
            },
            {
                kaccayana: { pali: "เต อิตฺถิขฺยา โป", ref: "กัจ. ๕๙" },
                padarupasiddhi: { ref: "ปท. ๑๘๒" }
            },
            {
                kaccayana: { pali: "อา โฆ", ref: "กัจ. ๖๐" },
                padarupasiddhi: { ref: "ปท. ๑๗๗" }
            },
            {
                kaccayana: { pali: "สาคโม เส", ref: "กัจ. ๖๑" },
                padarupasiddhi: { ref: "ปท. ๘๑" }
            },
            {
                kaccayana: { pali: "สํสาเสฺวกวจเนสุ จ", ref: "กัจ. ๖๒" },
                padarupasiddhi: { ref: "ปท. ๒๐๖" }
            },
            {
                kaccayana: { pali: "เอติมาสมิ", ref: "กัจ. ๖๓" },
                padarupasiddhi: { ref: "ปท. ๒๑๗" }
            },
            {
                kaccayana: { pali: "ตสฺสา วา", ref: "กัจ. ๖๔" },
                padarupasiddhi: { ref: "ปท. ๒๑๖" }
            },
            {
                kaccayana: { pali: "ตโต สสฺส สฺสาย", ref: "กัจ. ๖๕" },
                padarupasiddhi: { ref: "ปท. ๒๑๕" }
            },
            {
                kaccayana: { pali: "โฆ รสฺสํ", ref: "กัจ. ๖๖" },
                padarupasiddhi: { ref: "ปท. ๒๐๕" }
            },
            {
                kaccayana: { pali: "โน จ ทฺวาทิโต นํมฺหิ", ref: "กัจ. ๖๗" },
                padarupasiddhi: { ref: "ปท. ๒๒๙" }
            },
            {
                kaccayana: { pali: "อมา ปโต สฺมึสฺมานํ วา", ref: "กัจ. ๖๘" },
                padarupasiddhi: { ref: "ปท. ๑๘๔" }
            },
            {
                kaccayana: { pali: "อาทิโต โอ จ", ref: "กัจ. ๖๙" },
                padarupasiddhi: { ref: "ปท. ๑๘๖" }
            },
            {
                kaccayana: { pali: "ฌลานมิยุวา สเร วา", ref: "กัจ. ๗๐" },
                padarupasiddhi: { ref: "ปท. ๓๐" }
            },
            {
                kaccayana: { pali: "ยวการา จ", ref: "กัจ. ๗๑" },
                padarupasiddhi: { ref: "ปท. ๔๘๙" }
            },
            {
                kaccayana: { pali: "ปสญฺญสฺส จ", ref: "กัจ. ๗๒" },
                padarupasiddhi: { ref: "ปท. ๑๘๕" }
            },
            {
                kaccayana: { pali: "คาว เส", ref: "กัจ. ๗๓" },
                padarupasiddhi: { ref: "ปท. ๑๗๔" }
            },
            {
                kaccayana: { pali: "โยสุ จ", ref: "กัจ. ๗๔" },
                padarupasiddhi: { ref: "ปท. ๑๖๙" }
            },
            {
                kaccayana: { pali: "อวํมฺหิ จ", ref: "กัจ. ๗๕" },
                padarupasiddhi: { ref: "ปท. ๑๗๐" }
            },
            {
                kaccayana: { pali: "อาวสฺสุ วา", ref: "กัจ. ๗๖" },
                padarupasiddhi: { ref: "ปท. ๑๗๑" }
            },
            {
                kaccayana: { pali: "ตโต นมํ ปติมฺหาลุตฺเต จ สมาเส", ref: "กัจ. ๗๗" },
                padarupasiddhi: { ref: "ปท. ๑๗๕" }
            },
            {
                kaccayana: { pali: "โอ สเร จ", ref: "กัจ. ๗๘" },
                padarupasiddhi: { ref: "ปท. ๓๑" }
            },
            {
                kaccayana: { pali: "ตพฺบิปรีตูปปเท พฺยญฺชเน จ", ref: "กัจ. ๗๙" },
                padarupasiddhi: { ref: "ปท. ๔๖" }
            },
            {
                kaccayana: { pali: "โคณ นํมฺหิ วา", ref: "กัจ. ๘๐" },
                padarupasiddhi: { ref: "ปท. ๑๗๓" }
            },
            {
                kaccayana: { pali: "สุหินาสุ จ", ref: "กัจ. ๘๑" },
                padarupasiddhi: { ref: "ปท. ๑๗๒" }
            },
            {
                kaccayana: { pali: "อํโม นิคฺคหีตํ ฌลเปหิ", ref: "กัจ. ๘๒" },
                padarupasiddhi: { ref: "ปท. ๑๔๙" }
            },
            {
                kaccayana: { pali: "สรโลโปมาเทสปจฺจยาทิมฺหิ สรโลเป ตุ ปกติ", ref: "กัจ. ๘๓" },
                padarupasiddhi: { ref: "ปท. ๖๗" }
            },
            {
                kaccayana: { pali: "อโฆ รสฺสเมกวจนโยสฺวปิ จ", ref: "กัจ. ๘๔" },
                padarupasiddhi: { ref: "ปท. ๑๔๔" }
            },
            {
                kaccayana: { pali: "น สิสฺมิมนปุํสกานิ", ref: "กัจ. ๘๕" },
                padarupasiddhi: { ref: "ปท. ๑๕๐" }
            },
            {
                kaccayana: { pali: "อุภาทิโต นมินฺนํ", ref: "กัจ. ๘๖" },
                padarupasiddhi: { ref: "ปท. ๒๒๗" }
            },
            {
                kaccayana: { pali: "อิณฺณมิณฺณนฺนํ ตีหิ สงฺขฺยาหิ", ref: "กัจ. ๘๗" },
                padarupasiddhi: { ref: "ปท. ๒๓๑" }
            },
            {
                kaccayana: { pali: "โยสุ กตนิการโลเปสุ ทีฆํ", ref: "กัจ. ๘๘" },
                padarupasiddhi: { ref: "ปท. ๑๔๗" }
            },
            {
                kaccayana: { pali: "สุนํหิสุ จ", ref: "กัจ. ๘๙" },
                padarupasiddhi: { ref: "ปท. ๘๗" }
            },
            {
                kaccayana: { pali: "ปญฺจาทีนมตฺตํ", ref: "กัจ. ๙๐" },
                padarupasiddhi: { ref: "ปท. ๒๕๒" }
            },
            {
                kaccayana: { pali: "ปติสฺสินีมฺหิ", ref: "กัจ. ๙๑" },
                padarupasiddhi: { ref: "ปท. ๑๙๔" }
            },
            {
                kaccayana: { pali: "นฺตุสฺสนฺโต โยสุ จ", ref: "กัจ. ๙๒" },
                padarupasiddhi: { ref: "ปท. ๑๐๐" }
            },
            {
                kaccayana: { pali: "สพฺบสฺส วา อํเสสุ", ref: "กัจ. ๙๓" },
                padarupasiddhi: { ref: "ปท. ๑๐๖" }
            },
            {
                kaccayana: { pali: "สิมฺหิ วา", ref: "กัจ. ๙๔" },
                padarupasiddhi: { ref: "ปท. ๑๐๕" }
            },
            {
                kaccayana: { pali: "อคฺคิสฺสินิ", ref: "กัจ. ๙๕" },
                padarupasiddhi: { ref: "ปท. ๑๔๕" }
            },
            {
                kaccayana: { pali: "โยสฺวกตรสฺโส โฌ", ref: "กัจ. ๙๖" },
                padarupasiddhi: { ref: "ปท. ๑๔๘" }
            },
            {
                kaccayana: { pali: "เวโวสุ โล จ", ref: "กัจ. ๙๗" },
                padarupasiddhi: { ref: "ปท. ๑๕๖" }
            },
            {
                kaccayana: { pali: "มาตุลาทีนมานตฺตมีกาเร", ref: "กัจ. ๙๘" },
                padarupasiddhi: { ref: "ปท. ๑๘๙" }
            },
            {
                kaccayana: { pali: "สฺมาหิสฺมึนํ มฺหาภิมฺหิ วา", ref: "กัจ. ๙๙" },
                padarupasiddhi: { ref: "ปท. ๘๑" }
            },
            {
                kaccayana: { pali: "น ติเมหิ กตากาเรหิ", ref: "กัจ. ๑๐๐" },
                padarupasiddhi: { ref: "ปท. ๒๑๔" }
            },
            {
                kaccayana: { pali: "สุหิสฺวกาโร เอ", ref: "กัจ. ๑๐๑" },
                padarupasiddhi: { ref: "ปท. ๘๐" }
            },
            {
                kaccayana: { pali: "สพฺพนามานํ นํมฺหิ จ", ref: "กัจ. ๑๐๒" },
                padarupasiddhi: { ref: "ปท. ๒๐๒" }
            },
            {
                kaccayana: { pali: "อโต เนน", ref: "กัจ. ๑๐๓" },
                padarupasiddhi: { ref: "ปท. ๗๙" }
            },
            {
                kaccayana: { pali: "โส", ref: "กัจ. ๑๐๔" },
                padarupasiddhi: { ref: "ปท. ๖๖" }
            },
            {
                kaccayana: { pali: "โส วา", ref: "กัจ. ๑๐๕" },
                padarupasiddhi: { ref: "ปท. ๐" }
            },
            {
                kaccayana: { pali: "ทีโฆเรหิ", ref: "กัจ. ๑๐๖" },
                padarupasiddhi: { ref: "ปท. ๓๐๒" }
            },
            {
                kaccayana: { pali: "สพฺบโยนีนมาเอ", ref: "กัจ. ๑๐๗" },
                padarupasiddhi: { ref: "ปท. ๖๙" }
            },
            {
                kaccayana: { pali: "สฺมาสฺมึนํ วา", ref: "กัจ. ๑๐๘" },
                padarupasiddhi: { ref: "ปท. ๙๐" }
            },
            {
                kaccayana: { pali: "อาย จตุตฺเถกวจนสฺส ตุ", ref: "กัจ. ๑๐๙" },
                padarupasiddhi: { ref: "ปท. ๒๙๕" }
            },
            {
                kaccayana: { pali: "ตโย เนว จ สบฺพนาเมหิ", ref: "กัจ. ๑๑๐" },
                padarupasiddhi: { ref: "ปท. ๒๐๑" }
            },
            {
                kaccayana: { pali: "ฆโต นาทีนํ", ref: "กัจ. ๑๑๑" },
                padarupasiddhi: { ref: "ปท. ๑๗๙" }
            },
            {
                kaccayana: { pali: "ปโต ยา", ref: "กัจ. ๑๑๒" },
                padarupasiddhi: { ref: "ปท. ๑๘๓" }
            },
            {
                kaccayana: { pali: "สขโต คสฺเส วา", ref: "กัจ. ๑๑๓" },
                padarupasiddhi: { ref: "ปท. ๑๓๒" }
            },
            {
                kaccayana: { pali: "ฆเต จ", ref: "กัจ. ๑๑๔" },
                padarupasiddhi: { ref: "ปท. ๑๗๘" }
            },
            {
                kaccayana: { pali: "น อมฺมาทิโต", ref: "กัจ. ๑๑๕" },
                padarupasiddhi: { ref: "ปท. ๑๘๑" }
            },
            {
                kaccayana: { pali: "อกตรสฺสา ลโต ยฺวาลปนสฺส เวโว", ref: "กัจ. ๑๑๖" },
                padarupasiddhi: { ref: "ปท. ๑๕๗" }
            },
            {
                kaccayana: { pali: "ฌลโต สสฺส โน วา", ref: "กัจ. ๑๑๗" },
                padarupasiddhi: { ref: "ปท. ๑๒๔" }
            },
            {
                kaccayana: { pali: "ฆปโต จ โยนํ โลโป", ref: "กัจ. ๑๑๘" },
                padarupasiddhi: { ref: "ปท. ๑๔๖" }
            },
            {
                kaccayana: { pali: "ลโต โวกาโร จ", ref: "กัจ. ๑๑๙" },
                padarupasiddhi: { ref: "ปท. ๑๕๕" }
            },
            {
                kaccayana: { pali: "อิติ นามกปฺเป ปฐโม กณฺโฑ" }
            },
            {
                kaccayana: { pali: "อมฺหสฺส มมํ สวิภตฺติสฺส เส", ref: "กัจ. ๑๒๐" },
                padarupasiddhi: { ref: "ปท. ๒๔๓" }
            },
            {
                kaccayana: { pali: "มยํ โยมฺหิ ปฐเม", ref: "กัจ. ๑๒๑" },
                padarupasiddhi: { ref: "ปท. ๒๓๓" }
            },
            {
                kaccayana: { pali: "นฺตุสฺส นฺโต", ref: "กัจ. ๑๒๒" },
                padarupasiddhi: { ref: "ปท. ๙๙" }
            },
            {
                kaccayana: { pali: "นฺตสฺส เส วา", ref: "กัจ. ๑๒๓" },
                padarupasiddhi: { ref: "ปท. ๑๐๓" }
            },
            {
                kaccayana: { pali: "อา สิมฺหิ", ref: "กัจ. ๑๒๔" },
                padarupasiddhi: { ref: "ปท. ๙๘" }
            },
            {
                kaccayana: { pali: "อํ นปุํสเก", ref: "กัจ. ๑๒๕" },
                padarupasiddhi: { ref: "ปท. ๑๙๘" }
            },
            {
                kaccayana: { pali: "อวณฺณา จ เค", ref: "กัจ. ๑๒๖" },
                padarupasiddhi: { ref: "ปท. ๑๐๑" }
            },
            {
                kaccayana: { pali: "โตติตา สสฺมึนาสุ", ref: "กัจ. ๑๒๗" },
                padarupasiddhi: { ref: "ปท. ๑๐๒" }
            },
            {
                kaccayana: { pali: "นํมฺหิ ตํ วา", ref: "กัจ. ๑๒๘" },
                padarupasiddhi: { ref: "ปท. ๑๐๔" }
            },
            {
                kaccayana: { pali: "อิมสฺสิทมํสิสุ นปุํสเก", ref: "กัจ. ๑๒๙" },
                padarupasiddhi: { ref: "ปท. ๐.๒๒" }
            },
            {
                kaccayana: { pali: "อมุสฺสาทุํ", ref: "กัจ. ๑๓๐" },
                padarupasiddhi: { ref: "ปท. ๒๒๕" }
            },
            {
                kaccayana: { pali: "อิตฺถิปุมนปุํสกสงฺขฺยํ", ref: "กัจ. ๑๓๑" },
                padarupasiddhi: { ref: "ปท. ๐" }
            },
            {
                kaccayana: { pali: "โยสุ ทฺวินฺนํ เทฺว จ", ref: "กัจ. ๑๓๒" },
                padarupasiddhi: { ref: "ปท. ๒๒๘" }
            },
            {
                kaccayana: { pali: "ติ จตุนฺนํ ติสฺโส จตสฺโส ตโย จตฺตาโร ตีณิ จตฺตาริ", ref: "กัจ. ๑๓๓" },
                padarupasiddhi: { ref: "ปท. ๒๓๐" }
            },
            {
                kaccayana: { pali: "ปญฺจาทีนมาคาโร", ref: "กัจ. ๑๓๔" },
                padarupasiddhi: { ref: "ปท. ๒๕๑" }
            },
            {
                kaccayana: { pali: "ราชสฺส รญฺโญราชิโน เส", ref: "กัจ. ๑๓๕" },
                padarupasiddhi: { ref: "ปท. ๑๑๘" }
            },
            {
                kaccayana: { pali: "รญฺญํ นํมฺหิ วา", ref: "กัจ. ๑๓๖" },
                padarupasiddhi: { ref: "ปท. ๑๑๙" }
            },
            {
                kaccayana: { pali: "นามฺหิ รญฺญา วา", ref: "กัจ. ๑๓๗" },
                padarupasiddhi: { ref: "ปท. ๑๑๖" }
            },
            {
                kaccayana: { pali: "สฺมึมฺหิ รญฺเญ ราชินิ", ref: "กัจ. ๑๓๘" },
                padarupasiddhi: { ref: "ปท. ๑๒๑" }
            },
            {
                kaccayana: { pali: "ตุมฺหมฺหากํ ตยิ มยิ", ref: "กัจ. ๑๓๙" },
                padarupasiddhi: { ref: "ปท. ๒๔๕" }
            },
            {
                kaccayana: { pali: "ตฺวมหํ สิมฺหิ จ", ref: "กัจ. ๑๔๐" },
                padarupasiddhi: { ref: "ปท. ๒๓๒" }
            },
            {
                kaccayana: { pali: "ตว มม เส", ref: "กัจ. ๑๔๑" },
                padarupasiddhi: { ref: "ปท. ๒๔๑" }
            },
            {
                kaccayana: { pali: "ตุยฺหํ มยฺหญฺจ", ref: "กัจ. ๑๔๒" },
                padarupasiddhi: { ref: "ปท. ๒๔๒" }
            },
            {
                kaccayana: { pali: "ตํ มมํมฺหิ", ref: "กัจ. ๑๔๓" },
                padarupasiddhi: { ref: "ปท. ๒๓๕" }
            },
            {
                kaccayana: { pali: "ตวํ มมญฺจ นวา", ref: "กัจ. ๑๔๔" },
                padarupasiddhi: { ref: "ปท. ๒๓๔" }
            },
            {
                kaccayana: { pali: "นามฺหิ ตยา มยา", ref: "กัจ. ๑๔๕" },
                padarupasiddhi: { ref: "ปท. ๒๓๘" }
            },
            {
                kaccayana: { pali: "ตุมฺหสฺส ตุวํ ตฺวมํมฺหิ", ref: "กัจ. ๑๔๖" },
                padarupasiddhi: { ref: "ปท. ๒๓๖" }
            },
            {
                kaccayana: { pali: "ปทโต ทุติยาจตุตฺถีฉฏฺฐีสุ โว โน", ref: "กัจ. ๑๔๗" },
                padarupasiddhi: { ref: "ปท. ๒๔๖" }
            },
            {
                kaccayana: { pali: "เตเมกวจเนสุ จ", ref: "กัจ. ๑๔๘" },
                padarupasiddhi: { ref: "ปท. ๒๔๗" }
            },
            {
                kaccayana: { pali: "น อํมฺหิ", ref: "กัจ. ๑๔๙" },
                padarupasiddhi: { ref: "ปท. ๒๔๘" }
            },
            {
                kaccayana: { pali: "วา ตติเย จ", ref: "กัจ. ๑๕๐" },
                padarupasiddhi: { ref: "ปท. ๒๔๙" }
            },
            {
                kaccayana: { pali: "พหุวจเนสุ โวโน", ref: "กัจ. ๑๕๑" },
                padarupasiddhi: { ref: "ปท. ๒๕๐" }
            },
            {
                kaccayana: { pali: "ปุมนฺตสฺสา สิมฺหิ", ref: "กัจ. ๑๕๒" },
                padarupasiddhi: { ref: "ปท. ๑๓๖" }
            },
            {
                kaccayana: { pali: "อมาลปเนกวจเน", ref: "กัจ. ๑๕๓" },
                padarupasiddhi: { ref: "ปท. ๑๓๘" }
            },
            {
                kaccayana: { pali: "สมาเส จ วิภาสา", ref: "กัจ. ๑๕๔" },
                padarupasiddhi: { ref: "ปท. ๐" }
            },
            {
                kaccayana: { pali: "โยสฺวาโน", ref: "กัจ. ๑๕๕" },
                padarupasiddhi: { ref: "ปท. ๑๓๗" }
            },
            {
                kaccayana: { pali: "อาเน สฺมึมฺหิ วา", ref: "กัจ. ๑๕๖" },
                padarupasiddhi: { ref: "ปท. ๑๔๒" }
            },
            {
                kaccayana: { pali: "หิวิภตฺติมฺหิ จ", ref: "กัจ. ๑๕๗" },
                padarupasiddhi: { ref: "ปท. ๑๔๐" }
            },
            {
                kaccayana: { pali: "สุสฺมิมา วา", ref: "กัจ. ๑๕๘" },
                padarupasiddhi: { ref: "ปท. ๑๔๓" }
            },
            {
                kaccayana: { pali: "อุ นามฺหิ จ", ref: "กัจ. ๑๕๙" },
                padarupasiddhi: { ref: "ปท. ๑๓๙" }
            },
            {
                kaccayana: { pali: "อกมฺมนฺตสฺส จ", ref: "กัจ. ๑๖๐" },
                padarupasiddhi: { ref: "ปท. ๑๙๗" }
            },
            {
                kaccayana: { pali: "อิติ นามกปฺเป ทุติโย กณฺโฑ" }
            },
            {
                kaccayana: { pali: "ตุมฺหมฺเหหิ นมากํ", ref: "กัจ. ๑๖๑" },
                padarupasiddhi: { ref: "ปท. ๒๔๔" }
            },
            {
                kaccayana: { pali: "วา ยฺวปฺปฐโม", ref: "กัจ. ๑๖๒" },
                padarupasiddhi: { ref: "ปท. ๒๓๗" }
            },
            {
                kaccayana: { pali: "สสฺสํ", ref: "กัจ. ๑๖๓" },
                padarupasiddhi: { ref: "ปท. ๒๔๐" }
            },
            {
                kaccayana: { pali: "สพฺพนามการเต ปฐโม", ref: "กัจ. ๑๖๔" },
                padarupasiddhi: { ref: "ปท. ๒๐๐" }
            },
            {
                kaccayana: { pali: "ทฺวนฺทฏฺฐา วา", ref: "กัจ. ๑๖๕" },
                padarupasiddhi: { ref: "ปท. ๒๐๘" }
            },
            {
                kaccayana: { pali: "นาญฺญํ สพฺพนามิกํ", ref: "กัจ. ๑๖๖" },
                padarupasiddhi: { ref: "ปท. ๒๐๙" }
            },
            {
                kaccayana: { pali: "พหุพฺพีหิมฺหิ จ", ref: "กัจ. ๑๖๗" },
                padarupasiddhi: { ref: "ปท. ๒๑๐" }
            },
            {
                kaccayana: { pali: "สพฺบโต นํ สํสานํ", ref: "กัจ. ๑๖๘" },
                padarupasiddhi: { ref: "ปท. ๒๐๓" }
            },
            {
                kaccayana: { pali: "ราชสฺส ราชุ สุนํหิสุ จ", ref: "กัจ. ๑๖๙" },
                padarupasiddhi: { ref: "ปท. ๑๑๗" }
            },
            {
                kaccayana: { pali: "สพฺพสฺสิมสฺเส วา", ref: "กัจ. ๑๗๐" },
                padarupasiddhi: { ref: "ปท. ๒๒๐" }
            },
            {
                kaccayana: { pali: "อนิมิ นามฺหิ จ", ref: "กัจ. ๑๗๑" },
                padarupasiddhi: { ref: "ปท. ๒๑๙" }
            },
            {
                kaccayana: { pali: "อนปุํสกสฺสายํ สิมฺหิ", ref: "กัจ. ๑๗๒" },
                padarupasiddhi: { ref: "ปท. ๒๑๘" }
            },
            {
                kaccayana: { pali: "อมุสฺส โม สํ", ref: "กัจ. ๑๗๓" },
                padarupasiddhi: { ref: "ปท. ๒๒๓" }
            },
            {
                kaccayana: { pali: "เอตเตสํ โต", ref: "กัจ. ๑๗๔" },
                padarupasiddhi: { ref: "ปท. ๒๑๑" }
            },
            {
                kaccayana: { pali: "ตสฺส วา นตฺตํ สพฺพตฺถ", ref: "กัจ. ๑๗๕" },
                padarupasiddhi: { ref: "ปท. ๒๑๒" }
            },
            {
                kaccayana: { pali: "สสฺมาสฺมึ สํสาสวตฺตํ", ref: "กัจ. ๑๗๖" },
                padarupasiddhi: { ref: "ปท. ๒๑๓" }
            },
            {
                kaccayana: { pali: "อิมสทฺทสฺส จ", ref: "กัจ. ๑๗๗" },
                padarupasiddhi: { ref: "ปท. ๒๒๑" }
            },
            {
                kaccayana: { pali: "สพฺบโต โก", ref: "กัจ. ๑๗๘" },
                padarupasiddhi: { ref: "ปท. ๒๒๔" }
            },
            {
                kaccayana: { pali: "ฆปโต สฺมึสานํ สํสา", ref: "กัจ. ๑๗๙" },
                padarupasiddhi: { ref: "ปท. ๒๐๔" }
            },
            {
                kaccayana: { pali: "เนตาหิ สฺมิมายยา", ref: "กัจ. ๑๘๐" },
                padarupasiddhi: { ref: "ปท. ๒๐๗" }
            },
            {
                kaccayana: { pali: "มโนคณาทิโต สฺมึนานมิอา", ref: "กัจ. ๑๘๑" },
                padarupasiddhi: { ref: "ปท. ๙๕" }
            },
            {
                kaccayana: { pali: "สสฺส โจ", ref: "กัจ. ๑๘๒" },
                padarupasiddhi: { ref: "ปท. ๙๗" }
            },
            {
                kaccayana: { pali: "เอเตสโม โลเป", ref: "กัจ. ๑๘๓" },
                padarupasiddhi: { ref: "ปท. ๔๘" }
            },
            {
                kaccayana: { pali: "ส สเร วาคโม", ref: "กัจ. ๑๘๔" },
                padarupasiddhi: { ref: "ปท. ๙๖" }
            },
            {
                kaccayana: { pali: "สนฺตสทฺทสฺส โส เภ โพ จนฺเต", ref: "กัจ. ๑๘๕" },
                padarupasiddhi: { ref: "ปท. ๑๑๒" }
            },
            {
                kaccayana: { pali: "สิมฺหิ คจฺฉนฺตาทีนํ นฺตสทฺโท อํ", ref: "กัจ. ๑๘๖" },
                padarupasiddhi: { ref: "ปท. ๑๐๗" }
            },
            {
                kaccayana: { pali: "เสเสสุ นฺตุว", ref: "กัจ. ๑๘๗" },
                padarupasiddhi: { ref: "ปท. ๑๐๘" }
            },
            {
                kaccayana: { pali: "พฺรหฺมตฺตสขราชาทิโต อมานํ", ref: "กัจ. ๑๘๘" },
                padarupasiddhi: { ref: "ปท. ๑๕๕" }
            },
            {
                kaccayana: { pali: "สฺยา จ", ref: "กัจ. ๑๘๙" },
                padarupasiddhi: { ref: "ปท. ๑๑๓" }
            },
            {
                kaccayana: { pali: "โยนมาโน", ref: "กัจ. ๑๙๐" },
                padarupasiddhi: { ref: "ปท. ๑๑๔" }
            },
            {
                kaccayana: { pali: "สขโต จาโยโน", ref: "กัจ. ๑๙๑" },
                padarupasiddhi: { ref: "ปท. ๑๓๐" }
            },
            {
                kaccayana: { pali: "สฺมิเม", ref: "กัจ. ๑๙๒" },
                padarupasiddhi: { ref: "ปท. ๑๓๕" }
            },
            {
                kaccayana: { pali: "พฺรหฺมโต คสฺส จ", ref: "กัจ. ๑๙๓" },
                padarupasiddhi: { ref: "ปท. ๑๒๒" }
            },
            {
                kaccayana: { pali: "สขนฺตสฺสิ โนนานํเสสุ", ref: "กัจ. ๑๙๔" },
                padarupasiddhi: { ref: "ปท. ๑๓๑" }
            },
            {
                kaccayana: { pali: "อาโร หิมฺหิ วา", ref: "กัจ. ๑๙๕" },
                padarupasiddhi: { ref: "ปท. ๑๓๔" }
            },
            {
                kaccayana: { pali: "สุนมํสุ วา", ref: "กัจ. ๑๙๖" },
                padarupasiddhi: { ref: "ปท. ๑๓๓" }
            },
            {
                kaccayana: { pali: "พฺรหฺมโต ตุ สฺมึ นิ", ref: "กัจ. ๑๙๗" },
                padarupasiddhi: { ref: "ปท. ๑๒๕" }
            },
            {
                kaccayana: { pali: "อุตฺตํ สนาสุ", ref: "กัจ. ๑๙๘" },
                padarupasiddhi: { ref: "ปท. ๑๒๓" }
            },
            {
                kaccayana: { pali: "สตฺถุปิตาทีนมา สิสฺมึ สิโลโป จ", ref: "กัจ. ๑๙๙" },
                padarupasiddhi: { ref: "ปท. ๑๕๘" }
            },
            {
                kaccayana: { pali: "อญฺเญสฺวารตฺตํ", ref: "กัจ. ๒๐๐" },
                padarupasiddhi: { ref: "ปท. ๑๕๙" }
            },
            {
                kaccayana: { pali: "วา นํมฺหิ", ref: "กัจ. ๒๐๑" },
                padarupasiddhi: { ref: "ปท. ๑๖๓" }
            },
            {
                kaccayana: { pali: "สตฺถุนตฺตญฺจ", ref: "กัจ. ๒๐๒" },
                padarupasiddhi: { ref: "ปท. ๑๖๔" }
            },
            {
                kaccayana: { pali: "อุ สสฺมึ สโลโป จ", ref: "กัจ. ๒๐๓" },
                padarupasiddhi: { ref: "ปท. ๑๖๒" }
            },
            {
                kaccayana: { pali: "สกมนฺธาตาทีนญฺจ", ref: "กัจ. ๒๐๔" },
                padarupasiddhi: { ref: "ปท. ๑๖๗" }
            },
            {
                kaccayana: { pali: "ตโต โยนโม ตุ", ref: "กัจ. ๒๐๕" },
                padarupasiddhi: { ref: "ปท. ๑๖๐" }
            },
            {
                kaccayana: { pali: "ตโต สฺมิมิ", ref: "กัจ. ๒๐๖" },
                padarupasiddhi: { ref: "ปท. ๑๖๕" }
            },
            {
                kaccayana: { pali: "นา อา", ref: "กัจ. ๒๐๗" },
                padarupasiddhi: { ref: "ปท. ๑๖๑" }
            },
            {
                kaccayana: { pali: "อาโร รสฺสมิกาเร", ref: "กัจ. ๒๐๘" },
                padarupasiddhi: { ref: "ปท. ๑๖๖" }
            },
            {
                kaccayana: { pali: "ปิตาทีนมสิมฺหิ", ref: "กัจ. ๒๐๙" },
                padarupasiddhi: { ref: "ปท. ๑๖๘" }
            },
            {
                kaccayana: { pali: "ตยาตยีนํ ตกาโร ตฺวตฺตํ วา", ref: "กัจ. ๒๑๐" },
                padarupasiddhi: { ref: "ปท. ๒๓๙" }
            },
            {
                kaccayana: { pali: "อิติ นามกปฺเป ตติโย กณฺโฑ" }
            },
            {
                kaccayana: { pali: "อตฺตนฺโต หิสฺมิมนตฺตํ", ref: "กัจ. ๒๑๑" },
                padarupasiddhi: { ref: "ปท. ๑๒๖" }
            },
            {
                kaccayana: { pali: "ตโต สฺมึ นิ", ref: "กัจ. ๒๑๒" },
                padarupasiddhi: { ref: "ปท. ๑๒๙" }
            },
            {
                kaccayana: { pali: "สสฺส โน", ref: "กัจ. ๒๑๓" },
                padarupasiddhi: { ref: "ปท. ๑๒๗" }
            },
            {
                kaccayana: { pali: "สฺมา นา", ref: "กัจ. ๒๑๔" },
                padarupasiddhi: { ref: "ปท. ๑๒๘" }
            },
            {
                kaccayana: { pali: "ฌลโต จ", ref: "กัจ. ๒๑๕" },
                padarupasiddhi: { ref: "ปท. ๑๔๑" }
            },
            {
                kaccayana: { pali: "ฆปโต สฺมึ ยํ วา", ref: "กัจ. ๒๑๖" },
                padarupasiddhi: { ref: "ปท. ๑๘๐" }
            },
            {
                kaccayana: { pali: "โยนํ นิ นปุํสเกหิ", ref: "กัจ. ๒๑๗" },
                padarupasiddhi: { ref: "ปท. ๑๙๙" }
            },
            {
                kaccayana: { pali: "อโต นิจฺจํ", ref: "กัจ. ๒๑๘" },
                padarupasiddhi: { ref: "ปท. ๑๙๖" }
            },
            {
                kaccayana: { pali: "สึ", ref: "กัจ. ๒๑๙" },
                padarupasiddhi: { ref: "ปท. ๑๙๕" }
            },
            {
                kaccayana: { pali: "เสสโต โลปํ คสิปิ", ref: "กัจ. ๒๒๐" },
                padarupasiddhi: { ref: "ปท. ๗๔" }
            },
            {
                kaccayana: { pali: "สพฺบาสมาวุโสปสคฺคนิปาตาทีหิ จ", ref: "กัจ. ๒๒๑" },
                padarupasiddhi: { ref: "ปท. ๒๘๒" }
            },
            {
                kaccayana: { pali: "ปุมสฺส ลิงฺคาทีสุ สมาเสสุ", ref: "กัจ. ๒๒๒" },
                padarupasiddhi: { ref: "ปท. ๓๒๗" }
            },
            {
                kaccayana: { pali: "อํยมีโต ปสญฺญโต", ref: "กัจ. ๒๒๓" },
                padarupasiddhi: { ref: "ปท. ๑๘๘" }
            },
            {
                kaccayana: { pali: "นํ ฌโต กตรสฺสา", ref: "กัจ. ๒๒๔" },
                padarupasiddhi: { ref: "ปท. ๑๕๓" }
            },
            {
                kaccayana: { pali: "โยนํ โน", ref: "กัจ. ๒๒๕" },
                padarupasiddhi: { ref: "ปท. ๑๕๑" }
            },
            {
                kaccayana: { pali: "สฺมึ นิ", ref: "กัจ. ๒๒๖" },
                padarupasiddhi: { ref: "ปท. ๑๕๔" }
            },
            {
                kaccayana: { pali: "กิสฺส ก เว จ", ref: "กัจ. ๒๒๗" },
                padarupasiddhi: { ref: "ปท. ๒๗๐" }
            },
            {
                kaccayana: { pali: "กุ หึหํสุ จ", ref: "กัจ. ๒๒๘" },
                padarupasiddhi: { ref: "ปท. ๒๗๒" }
            },
            {
                kaccayana: { pali: "เสเสสุ จ", ref: "กัจ. ๒๒๙" },
                padarupasiddhi: { ref: "ปท. ๒๒๖" }
            },
            {
                kaccayana: { pali: "ตฺรโตเถสุ จ", ref: "กัจ. ๒๓๐" },
                padarupasiddhi: { ref: "ปท. ๒๖๒" }
            },
            {
                kaccayana: { pali: "สพฺบสฺเสตสฺสากาโร วา", ref: "กัจ. ๒๓๑" },
                padarupasiddhi: { ref: "ปท. ๒๖๓" }
            },
            {
                kaccayana: { pali: "เตฺร นิจฺจํ", ref: "กัจ. ๒๓๒" },
                padarupasiddhi: { ref: "ปท. ๒๖๗" }
            },
            {
                kaccayana: { pali: "เอ โตเถสุ จ", ref: "กัจ. ๒๓๓" },
                padarupasiddhi: { ref: "ปท. ๒๖๔" }
            },
            {
                kaccayana: { pali: "อิมสฺสิ ถํทานิหโตเธสุ จ", ref: "กัจ. ๒๓๔" },
                padarupasiddhi: { ref: "ปท. ๒๖๕" }
            },
            {
                kaccayana: { pali: "อ ธุนามฺหิ จ", ref: "กัจ. ๒๓๕" },
                padarupasiddhi: { ref: "ปท. ๒๘๑" }
            },
            {
                kaccayana: { pali: "เอต รหิมฺหิ", ref: "กัจ. ๒๓๖" },
                padarupasiddhi: { ref: "ปท. ๒๘๐" }
            },
            {
                kaccayana: { pali: "อิตฺถิยมโต อาปจฺจโย", ref: "กัจ. ๒๓๗" },
                padarupasiddhi: { ref: "ปท. ๑๗๖" }
            },
            {
                kaccayana: { pali: "นทาทิโต วา อี", ref: "กัจ. ๒๓๘" },
                padarupasiddhi: { ref: "ปท. ๑๘๗" }
            },
            {
                kaccayana: { pali: "ณว ณิก เณยฺย ณ นฺตูหิ", ref: "กัจ. ๒๓๙" },
                padarupasiddhi: { ref: "ปท. ๑๙๐" }
            },
            {
                kaccayana: { pali: "ปติภิกฺขุราชีการนฺเตหิ อินี", ref: "กัจ. ๒๔๐" },
                padarupasiddhi: { ref: "ปท. ๑๙๓" }
            },
            {
                kaccayana: { pali: "นฺตุสฺส ตมีกาเร", ref: "กัจ. ๒๔๑" },
                padarupasiddhi: { ref: "ปท. ๑๙๑" }
            },
            {
                kaccayana: { pali: "ภวโต โภโต", ref: "กัจ. ๒๔๒" },
                padarupasiddhi: { ref: "ปท. ๑๙๒" }
            },
            {
                kaccayana: { pali: "โภ เค ตุ", ref: "กัจ. ๒๔๓" },
                padarupasiddhi: { ref: "ปท. ๑๑๐" }
            },
            {
                kaccayana: { pali: "อการปิตาทฺยนฺตานมา", ref: "กัจ. ๒๔๔" },
                padarupasiddhi: { ref: "ปท. ๗๒" }
            },
            {
                kaccayana: { pali: "ฌลปา รสฺสํ", ref: "กัจ. ๒๔๕" },
                padarupasiddhi: { ref: "ปท. ๑๕๒" }
            },
            {
                kaccayana: { pali: "อากาโร วา", ref: "กัจ. ๒๔๖" },
                padarupasiddhi: { ref: "ปท. ๗๓" }
            },
            {
                kaccayana: { pali: "อิติ นามกปฺเป จตุตฺโถ กณฺโฑ" }
            },
            {
                kaccayana: { pali: "ตฺวาทโย วิภตฺติสญฺญาโย", ref: "กัจ. ๒๔๗" },
                padarupasiddhi: { ref: "ปท. ๒๖๑" }
            },
            {
                kaccayana: { pali: "กฺวจิ โต ปญฺจมฺยตฺเถ", ref: "กัจ. ๒๔๘" },
                padarupasiddhi: { ref: "ปท. ๒๖๐" }
            },
            {
                kaccayana: { pali: "ตฺรถ สตฺตมิยา สพฺพนาเมหิ", ref: "กัจ. ๒๔๙" },
                padarupasiddhi: { ref: "ปท. ๒๖๖" }
            },
            {
                kaccayana: { pali: "สพฺบโต ธิ", ref: "กัจ. ๒๕๐" },
                padarupasiddhi: { ref: "ปท. ๒๖๘" }
            },
            {
                kaccayana: { pali: "กึสฺมา โว", ref: "กัจ. ๒๕๑" },
                padarupasiddhi: { ref: "ปท. ๒๖๙" }
            },
            {
                kaccayana: { pali: "หึหํหิญฺจนํ", ref: "กัจ. ๒๕๒" },
                padarupasiddhi: { ref: "ปท. ๒๗๑" }
            },
            {
                kaccayana: { pali: "ตมฺหา จ", ref: "กัจ. ๒๕๓" },
                padarupasiddhi: { ref: "ปท. ๒๗๓" }
            },
            {
                kaccayana: { pali: "อิมสฺมา หธา จ", ref: "กัจ. ๒๕๔" },
                padarupasiddhi: { ref: "ปท. ๒๗๔" }
            },
            {
                kaccayana: { pali: "ยโต หึ", ref: "กัจ. ๒๕๕" },
                padarupasiddhi: { ref: "ปท. ๒๷๕" }
            },
            {
                kaccayana: { pali: "กาเล", ref: "กัจ. ๒๕๖" },
                padarupasiddhi: { ref: "ปท. ๐" }
            },
            {
                kaccayana: { pali: "กึสพฺพญฺเญกยกุหิ ทาทาจนํ", ref: "กัจ. ๒๕๗" },
                padarupasiddhi: { ref: "ปท. ๒๷๖" }
            },
            {
                kaccayana: { pali: "ตมฺหา ทานิ จ", ref: "กัจ. ๒๕๘" },
                padarupasiddhi: { ref: "ปท. ๒๷๘" }
            },
            {
                kaccayana: { pali: "อิมสฺมา รหิธุนาทานิ จ", ref: "กัจ. ๒๕๙" },
                padarupasiddhi: { ref: "ปท. ๒๷๙" }
            },
            {
                kaccayana: { pali: "สพฺบสฺส โส ทามฺหิ วา", ref: "กัจ. ๒๖๐" },
                padarupasiddhi: { ref: "ปท. ๒๷๗" }
            },
            {
                kaccayana: { pali: "อวณฺโณ เย โลปญฺจ", ref: "กัจ. ๒๖๑" },
                padarupasiddhi: { ref: "ปท. ๓๖๙" }
            },
            {
                kaccayana: { pali: "วุฑฺฒสฺส โช อิยิฏฺเฐสุ", ref: "กัจ. ๒๖๒" },
                padarupasiddhi: { ref: "ปท. ๓๙๑" }
            },
            {
                kaccayana: { pali: "ปสตฺถสฺส โส จ", ref: "กัจ. ๒๖๓" },
                padarupasiddhi: { ref: "ปท. ๓๙๒" }
            },
            {
                kaccayana: { pali: "อนฺติกสฺส เนโท", ref: "กัจ. ๒๖๔" },
                padarupasiddhi: { ref: "ปท. ๓๙๓" }
            },
            {
                kaccayana: { pali: "บาฬฺหสฺส สาโธ", ref: "กัจ. ๒๖๕" },
                padarupasiddhi: { ref: "ปท. ๓๙๔" }
            },
            {
                kaccayana: { pali: "อปฺปสฺส กณฺ", ref: "กัจ. ๒๖๖" },
                padarupasiddhi: { ref: "ปท. ๓๙๕" }
            },
            {
                kaccayana: { pali: "ยุวานญฺจ", ref: "กัจ. ๒๖๗" },
                padarupasiddhi: { ref: "ปท. ๓๙๖" }
            },
            {
                kaccayana: { pali: "วนฺตุมนฺตุวีนญฺจ โลโป", ref: "กัจ. ๒๖๘" },
                padarupasiddhi: { ref: "ปท. ๓๙๗" }
            },
            {
                kaccayana: { pali: "ยวตํ ตลนทการานํ พฺยญฺชนานิ จลญชการตฺตํ", ref: "กัจ. ๒๖๙" },
                padarupasiddhi: { ref: "ปท. ๔๑" }
            },
            {
                kaccayana: { pali: "อมฺห ตุมฺห นฺตุ ราช พฺรหฺมตฺต สข สตฺถุ ปิตาทีหิ สฺมา นา ว", ref: "กัจ. ๒๗๐" },
                padarupasiddhi: { ref: "ปท. ๑๒๐" }
            },
            {
                kaccayana: { pali: "อิติ นามกปฺเป ปญฺจโม กณฺโฑ" }
            },
            {
                kaccayana: { pali: "นามสุตฺตํ นิฏฺฐิตํ" }
            }
        ]
    }
];

const karakaTable3Data = [
    {
        topic: "ตารางที่ ๓. การกกปฺโป",
        formulas: [
            { kaccayana: { pali: "ยสฺมาทเปติ ภยมาทตฺเต วา ตทปาทานํ", ref: "กัจ. ๒๗๑" }, padarupasiddhi: { ref: "ปท. ๘๘/๓๐๘" } },
            { kaccayana: { pali: "ธาตุนามานมุปสคฺคโยคาทีสฺวปิ จ", ref: "กัจ. ๒๗๒" }, padarupasiddhi: { ref: "ปท. ๓๐๘" } },
            { kaccayana: { pali: "รกฺขณตฺถานมิจฺฉิตํ", ref: "กัจ. ๒๗๓" }, padarupasiddhi: { ref: "ปท. ๓๑๐" } },
            { kaccayana: { pali: "เยน วาทสฺสนํ", ref: "กัจ. ๒๗๔" }, padarupasiddhi: { ref: "ปท. ๓๑๑" } },
            { kaccayana: { pali: "ทูรนฺติกทฺธกาลนิมฺมานตฺวาโลปทิสาโยควิภตฺตารปฺปโยคสุทฺธปฺปโมจนเหตุวิวิตฺตปฺปมาณปุพฺพโยคบนฺธนคุณวจนปญฺหกถนโถกากตฺตูสุ จ", ref: "กัจ. ๒๗๕" }, padarupasiddhi: { ref: "ปท. ๓๑๒" } },
            { kaccayana: { pali: "ยสฺส ทาตุกาโม โรจเต ธารยเต วา ตํ สมฺปทานํ", ref: "กัจ. ๒๗๖" }, padarupasiddhi: { ref: "ปท. ๘๔/๓๐๒" } },
            { kaccayana: { pali: "สิลาฆหนุฐาสปธารปิหกุธทุหิสฺโสสูยราธิกฺขปจฺจาสุณ อนุปติคิณ ปุพฺบกตฺตาโรจนตฺถตทตฺถตุมตฺถาลมตฺถ มญฺญานาทรปฺปาณินิคตฺยตฺถกมฺมนิ อาสิสตฺถสมฺมุติ ภิยฺยสตฺตมฺยตฺเถสุ จ", ref: "กัจ. ๒๷๗" }, padarupasiddhi: { ref: "ปท. ๓๐๓" } },
            { kaccayana: { pali: "โยธาโร ตโมกาสํ", ref: "กัจ. ๒๗๘" }, padarupasiddhi: { ref: "ปท. ๙๓/๓๒๐" } },
            { kaccayana: { pali: "เยน วา กยิรเต ตํ กรณํ", ref: "กัจ. ๒๗๙" }, padarupasiddhi: { ref: "ปท. ๘๒/๒๙๒" } },
            { kaccayana: { pali: "ยํ กโรติ ตํ กมฺมํ", ref: "กัจ. ๒๘๐" }, padarupasiddhi: { ref: "ปท. ๗๙/๒๘๕" } },
            { kaccayana: { pali: "โย กโรติ ส กตฺตา", ref: "กัจ. ๒๘๑" }, padarupasiddhi: { ref: "ปท. ๗๗/๒๙๔" } },
            { kaccayana: { pali: "โย กาเรติ ส เหตุ", ref: "กัจ. ๒๘๒" }, padarupasiddhi: { ref: "ปท. ๒๙๕" } },
            { kaccayana: { pali: "ยสฺส วา ปริคฺคโห ตํ สามี", ref: "กัจ. ๒๘๓" }, padarupasiddhi: { ref: "ปท. ๓๑๖" } },
            { kaccayana: { pali: "ลิงฺคตฺเถ ปฐมา", ref: "กัจ. ๒๘๔" }, padarupasiddhi: { ref: "ปท. ๒๘๓" } },
            { kaccayana: { pali: "อาลปเน จ", ref: "กัจ. ๒๘๕" }, padarupasiddhi: { ref: "ปท. ๗๐" } },
            { kaccayana: { pali: "กรเณ ตติยา", ref: "กัจ. ๒๘๖" }, padarupasiddhi: { ref: "ปท. ๒๙๑" } },
            { kaccayana: { pali: "สหาทิโยเค จ", ref: "กัจ. ๒๘๗" }, padarupasiddhi: { ref: "ปท. ๒๙๖" } },
            { kaccayana: { pali: "กตฺตริ จ", ref: "กัจ. ๒๘๘" }, padarupasiddhi: { ref: "ปท. ๒๙๓" } },
            { kaccayana: { pali: "เหตฺวตฺเถ จ", ref: "กัจ. ๒๘๙" }, padarupasiddhi: { ref: "ปท. ๒๙๗" } },
            { kaccayana: { pali: "สตฺตมฺยตฺเถ จ", ref: "กัจ. ๒๙๐" }, padarupasiddhi: { ref: "ปท. ๒๙๘" } },
            { kaccayana: { pali: "เยนงฺควิกาโร", ref: "กัจ. ๒๙๑" }, padarupasiddhi: { ref: "ปท. ๒๙๙" } },
            { kaccayana: { pali: "วิเสสเน จ", ref: "กัจ. ๒๙๒" }, padarupasiddhi: { ref: "ปท. ๓๐๐" } },
            { kaccayana: { pali: "สมฺปทาเน จตุตฺถี", ref: "กัจ. ๒๙๓" }, padarupasiddhi: { ref: "ปท. ๓๐๑" } },
            { kaccayana: { pali: "นโมโยคาทีสฺวปิ จ", ref: "กัจ. ๒๙๔" }, padarupasiddhi: { ref: "ปท. ๓๐๕" } },
            { kaccayana: { pali: "อปาทาเน ปญฺจมี", ref: "กัจ. ๒๙๕" }, padarupasiddhi: { ref: "ปท. ๓๐๗" } },
            { kaccayana: { pali: "การณตฺเถ จ", ref: "กัจ. ๒๙๖" }, padarupasiddhi: { ref: "ปท. ๓๑๔" } },
            { kaccayana: { pali: "กมฺมตฺเถ ทุติยา", ref: "กัจ. ๒๙๗" }, padarupasiddhi: { ref: "ปท. ๒๘๔" } },
            { kaccayana: { pali: "กาลทฺธานมจฺจนฺตสํโยเค", ref: "กัจ. ๒๙๘" }, padarupasiddhi: { ref: "ปท. ๒๘๗" } },
            { kaccayana: { pali: "กมฺมปฺปวจนียยุตฺเต", ref: "กัจ. ๒๙๙" }, padarupasiddhi: { ref: "ปท. ๒๘๘" } },
            { kaccayana: { pali: "คติ พุทฺธิ ภุช ปฐ หร กร สฺยาทีนํ การิเต วา", ref: "กัจ. ๓๐๐" }, padarupasiddhi: { ref: "ปท. ๒๘๖" } },
            { kaccayana: { pali: "สามิสฺมึ ฉฏฺฐี", ref: "กัจ. ๓๐๑" }, padarupasiddhi: { ref: "ปท. ๓๑๕" } },
            { kaccayana: { pali: "โอกาเส สตฺตมี", ref: "กัจ. ๓๐๒" }, padarupasiddhi: { ref: "ปท. ๓๑๙" } },
            { kaccayana: { pali: "สามิสฺสราธิปติ ทายาท สกฺขี ปติภู ปสุต กุสเลหิ จ", ref: "กัจ. ๓๐๓" }, padarupasiddhi: { ref: "ปท. ๓๒๑" } },
            { kaccayana: { pali: "นิทฺธารเณ จ", ref: "กัจ. ๓๐๔" }, padarupasiddhi: { ref: "ปท. ๓๒๒" } },
            { kaccayana: { pali: "อนาทเร จ", ref: "กัจ. ๓๐๕" }, padarupasiddhi: { ref: "ปท. ๓๒๓" } },
            { kaccayana: { pali: "กฺวจิ ทุติยา ฉฏฺฐีนมตฺเถ", ref: "กัจ. ๓๐๖" }, padarupasiddhi: { ref: "ปท. ๒๘๙" } },
            { kaccayana: { pali: "ตติยาสตฺตมีนญฺจ", ref: "กัจ. ๓๐๗" }, padarupasiddhi: { ref: "ปท. ๒๙๐" } },
            { kaccayana: { pali: "ฉฏฺฐี จ", ref: "กัจ. ๓๑๐" }, padarupasiddhi: { ref: "ปท. ๓๑๗" } },
            { kaccayana: { pali: "ทุติยาปญฺจมีนญฺจ", ref: "กัจ. ๓๑๑" }, padarupasiddhi: { ref: "ปท. ๓๑๘" } },
            { kaccayana: { pali: "กมฺมกรณนิมิตฺตตฺเถสุ สตฺตมี", ref: "กัจ. ๓๑๒" }, padarupasiddhi: { ref: "ปท. ๓๒๔" } },
            { kaccayana: { pali: "สมฺปทาเน จ", ref: "กัจ. ๓๑๓" }, padarupasiddhi: { ref: "ปท. ๓๒๕" } },
            { kaccayana: { pali: "ปญฺจมฺยตฺเถ จ", ref: "กัจ. ๓๑๔" }, padarupasiddhi: { ref: "ปท. ๓๒๖" } },
            { kaccayana: { pali: "กาลภาเวสุ จ", ref: "กัจ. ๓๑๕" }, padarupasiddhi: { ref: "ปท. ๓๒๗" } },
            { kaccayana: { pali: "อุปธฺยาธิกิสฺสวจเน", ref: "กัจ. ๓๑๖" }, padarupasiddhi: { ref: "ปท. ๓๒๘" } },
            { kaccayana: { pali: "มณฺฑิตุสฺสุกฺเกสุ ตติยา จ", ref: "กัจ. ๓๑๗" }, padarupasiddhi: { ref: "ปท. ๓๒๙" } },
            { kaccayana: { pali: "อิติ นามกปฺเป การกกปฺโป" } },
            { kaccayana: { pali: "ฉฏฺโฐ กณฺโฑ" } },
            { kaccayana: { pali: "การกสุตฺตํ นิฏฺฐิตํ" } }
        ]
    }
];

const samasaTable4Data = [
    {
        topic: "ตารางที่ ๔. สมาสกปฺโป",
        formulas: [
            { kaccayana: { pali: "นามานํ สมาโส ยุตฺตตฺโถ", ref: "กัจ. ๓๑๖" }, padarupasiddhi: { ref: "ปท. ๓๓๑" } },
            { kaccayana: { pali: "เตสํ วิภตฺติโย โลปา จ", ref: "กัจ. ๓๑๗" }, padarupasiddhi: { ref: "ปท. ๓๓๒" } },
            { kaccayana: { pali: "ปกติ จสฺส สรนฺตสฺส", ref: "กัจ. ๓๑๘" }, padarupasiddhi: { ref: "ปท. ๓๓๓" } },
            { kaccayana: { pali: "อุปสคฺคนิปาตปุพฺบโก อพฺยยีภาโว", ref: "กัจ. ๓๑๙" }, padarupasiddhi: { ref: "ปท. ๓๓๐" } },
            { kaccayana: { pali: "โส นปุํสกลิงฺโค", ref: "กัจ. ๓๒๐" }, padarupasiddhi: { ref: "ปท. ๓๓๕" } },
            { kaccayana: { pali: "ทิคุสฺเสกตฺตํ", ref: "กัจ. ๓๒๑" }, padarupasiddhi: { ref: "ปท. ๓๔๙" } },
            { kaccayana: { pali: "ตถา ทฺวนฺเท ปาณิ ตูริย โยคฺค เสนงฺค ขุทฺท ชนฺตุกวิวิธ วิรุทฺธวิสภาคตฺถาทีนญฺจ", ref: "กัจ. ๓๒๒" }, padarupasiddhi: { ref: "ปท. ๓๕๙" } },
            { kaccayana: { pali: "วิภาสา รุกฺข ติณ ปสุ ธน ธญฺญ ชนปทาทीनญฺจ", ref: "กัจ. ๓๒๓" }, padarupasiddhi: { ref: "ปท. ๓๖๐" } },
            { kaccayana: { pali: "ทฺวิป데 ตุลฺยาธิกรเณ กมฺมธารโย", ref: "กัจ. ๓๒๔" }, padarupasiddhi: { ref: "ปท. ๓๓๙" } },
            { kaccayana: { pali: "สงฺขฺยาปุพฺโพ ทิคุ", ref: "กัจ. ๓๒๕" }, padarupasiddhi: { ref: "ปท. ๓๔๘" } },
            { kaccayana: { pali: "อุเภ ตปฺปุริสา", ref: "กัจ. ๓๒๖" }, padarupasiddhi: { ref: "ปท. ๓๔๑" } },
            { kaccayana: { pali: "อมาทโย ปรปเทภิ", ref: "กัจ. ๓๒๗" }, padarupasiddhi: { ref: "ปท. ๓๕๑" } },
            { kaccayana: { pali: "อญฺญปทตฺเถสุ พหุพฺพีหิ", ref: "กัจ. ๓๒๘" }, padarupasiddhi: { ref: "ปท. ๓๕๒" } },
            { kaccayana: { pali: "นามานํ สมุจฺจโย ทฺวนฺโท", ref: "กัจ. ๓๒๙" }, padarupasiddhi: { ref: "ปท. ๓๕๗" } },
            { kaccayana: { pali: "มหตํ มหา ตุลฺยาธิกรเณ ปเท", ref: "กัจ. ๓๓๐" }, padarupasiddhi: { ref: "ปท. ๓๔๐" } },
            { kaccayana: { pali: "อิตฺถิยํ ภาสิตปุมิตฺถี ปุมาว เจ", ref: "กัจ. ๓๓๑" }, padarupasiddhi: { ref: "ปท. ๓๕๓" } },
            { kaccayana: { pali: "กมฺมธารยสญฺเญ จ", ref: "กัจ. ๓๓๒" }, padarupasiddhi: { ref: "ปท. ๓๔๓" } },
            { kaccayana: { pali: "อตฺตํ นสฺส ตปฺปุริเส", ref: "กัจ. ๓๓๓" }, padarupasiddhi: { ref: "ปท. ๓๔๔" } },
            { kaccayana: { pali: "สเร อนฺ", ref: "กัจ. ๓๓๔" }, padarupasiddhi: { ref: "ปท. ๓๔๕" } },
            { kaccayana: { pali: "กทฺ กุสฺส", ref: "กัจ. ๓๓๕" }, padarupasiddhi: { ref: "ปท. ๓๔๖" } },
            { kaccayana: { pali: "กาปฺปตฺเถสุ จ", ref: "กัจ. ๓๓๖" }, padarupasiddhi: { ref: "ปท. ๓๔๗" } },
            { kaccayana: { pali: "กฺวจิ สมาสนฺตคตานมการนฺโต", ref: "กัจ. ๓๓๗" }, padarupasiddhi: { ref: "ปท. ๓๕๐" } },
            { kaccayana: { pali: "นทิมฺหา จ", ref: "กัจ. ๓๓๘" }, padarupasiddhi: { ref: "ปท. ๓๕๖" } },
            { kaccayana: { pali: "ชายาย ตุทํ ชานิ ปติมฺหิ", ref: "กัจ. ๓๓๙" }, padarupasiddhi: { ref: "ปท. ๓๕๘" } },
            { kaccayana: { pali: "ธนุมฺหา จ", ref: "กัจ. ๓๔๐" }, padarupasiddhi: { ref: "ปท. ๓๕๕" } },
            { kaccayana: { pali: "อํ วิภตฺตีนมการนฺตา อบฺยยีภาวา", ref: "กัจ. ๓๔๑" }, padarupasiddhi: { ref: "ปท. ๓๓๖" } },
            { kaccayana: { pali: "สโร รสฺโส นปุํสเก", ref: "กัจ. ๓๔๒" }, padarupasiddhi: { ref: "ปท. ๓๓๗" } },
            { kaccayana: { pali: "อญฺญสฺมา โลโป จ", ref: "กัจ. ๓๔๓" }, padarupasiddhi: { ref: "ปท. ๓๓๘" } },
            { kaccayana: { pali: "อิติ นามกปฺเป สมาสกปฺโป สตฺตโม กณฺโฑ" } },
            { kaccayana: { pali: "สมาสสุตฺตํ นิฏฐิตํ" } }
        ]
    }
];

const taddhitaTable5Data = [
    {
        topic: "ตารางที่ ๕. ตทฺธิตกปฺโป",
        formulas: [
            { kaccayana: { pali: "วา ณปจฺเจ", ref: "กัจ. ๓๔๔" }, padarupasiddhi: { ref: "ปท. ๓๖๑" } },
            { kaccayana: { pali: "ณายน ณาน วจฺฉาทิโต", ref: "กัจ. ๓๔๕" }, padarupasiddhi: { ref: "ปท. ๓๖๖" } },
            { kaccayana: { pali: "อิติ ตทฺธิตสุตฺตํ นิฏฺฐิตํ" }, padarupasiddhi: { pali: "อิติ ตทฺธิตสุตฺตํ นิฏฺฐิตํ" }, moggallana: { pali: "อิติ ตทฺธิตสุตฺตํ นิฏฺฐิตํ" }, saddaniti: { pali: "อิติ ตทฺธิตสุตฺตํ นิฏฺฐิตํ" } }
        ]
    }
];

const kittaTable7Data = [
    {
        topic: "ตารางที่ ๗. กิพฺพิธานกปฺโป",
        formulas: [
            { kaccayana: { pali: "ธาตุยา กมฺมาทิมฺหิ โณ", ref: "กัจ. ๕๒๔" }, padarupasiddhi: { ref: "ปท. ๕๖๑" } },
            { kaccayana: { pali: "สญฺญายมนุ", ref: "กัจ. ๕๒๕" }, padarupasiddhi: { ref: "ปท. ๕๖๕" } },
            { kaccayana: { pali: "ปุเร ททา จ อึ", ref: "กัจ. ๕๒๖" }, padarupasiddhi: { ref: "ปท. ๕๖๗" } },
            { kaccayana: { pali: "สพฺพโต ณฺวุ ตฺวา วี วา", ref: "กัจ. ๕๒๗" }, padarupasiddhi: { ref: "ปท. ๕๖๘" } },
            { kaccayana: { pali: "วิส รุช ปทาทิโต ณ", ref: "กัจ. ๕๒๘" }, padarupasiddhi: { ref: "ปท. ๕๗๗" } },
            { kaccayana: { pali: "ภาเว จ", ref: "กัจ. ๕๒๙" }, padarupasiddhi: { ref: "ปท. ๕๘๐" } },
            { kaccayana: { pali: "กฺวิ จ", ref: "กัจ. ๕๓๐" }, padarupasiddhi: { ref: "ปท. ๕๘๔" } },
            { kaccayana: { pali: "ธราทีหิ รมฺโม", ref: "กัจ. ๕๓๑" }, padarupasiddhi: { ref: "ปท. ๕๘๙" } },
            { kaccayana: { pali: "ตสฺสีลาทีสุ ณี ตฺวาวี จ", ref: "กัจ. ๕๓๒" }, padarupasiddhi: { ref: "ปท. ๕๙๐" } },
            { kaccayana: { pali: "สทฺท กุธ จล มณฺฑตฺถ รุจาทีหิ ยุ", ref: "กัจ. ๕๓๓" }, padarupasiddhi: { ref: "ปท. ๕๙๑" } },
            { kaccayana: { pali: "ปาราทิคมิมฺหา รู", ref: "กัจ. ๕๓๔" }, padarupasiddhi: { ref: "ปท. ๕๙๒" } },
            { kaccayana: { pali: "ภิกฺขาทิโต จ", ref: "กัจ. ๕๓๕" }, padarupasiddhi: { ref: "ปท. ๕๙๓" } },
            { kaccayana: { pali: "หนตฺยาทีนํ ณุโก", ref: "กัจ. ๕๓๖" }, padarupasiddhi: { ref: "ปท. ๕๙๔" } },
            { kaccayana: { pali: "นุ นิคฺคหีตํ ปทนฺเต", ref: "กัจ. ๕๓๗" }, padarupasiddhi: { ref: "ปท. ๕๖๖" } },
            { kaccayana: { pali: "สํหนาญฺญาย วา โร โฆ", ref: "กัจ. ๕๓๘" }, padarupasiddhi: { ref: "ปท. ๕๙๕" } },
            { kaccayana: { pali: "รมฺหิ รนฺโต ราทิโน", ref: "กัจ. ๕๓๙" }, padarupasiddhi: { ref: "ปท. ๕๕๘" } },
            { kaccayana: { pali: "ภาวกมฺเมสุ ตพฺพานียา", ref: "กัจ. ๕๔๐" }, padarupasiddhi: { ref: "ปท. ๕๔๕" } },
            { kaccayana: { pali: "โณฺย จ", ref: "กัจ. ๕๔๑" }, padarupasiddhi: { ref: "ปท. ๕๕๒" } },
            { kaccayana: { pali: "กรมฺหา ริจฺจ", ref: "กัจ. ๕๔๒" }, padarupasiddhi: { ref: "ปท. ๕๕๗" } },
            { kaccayana: { pali: "ภูโตพฺพ", ref: "กัจ. ๕๔๓" }, padarupasiddhi: { ref: "ปท. ๕๕๕" } },
            { kaccayana: { pali: "วท มท คมุ ยุช ครหาการาทีหิ ชฺช มฺม คฺค เยฺหยฺยาคาโร วา", ref: "กัจ. ๕๔๔" }, padarupasiddhi: { ref: "ปท. ๕๕๖" } },
            { kaccayana: { pali: "เต กิจฺจา", ref: "กัจ. ๕๔๕" }, padarupasiddhi: { ref: "ปท. ๕๔๘" } },
            { kaccayana: { pali: "อญฺเญ กิตฺ", ref: "กัจ. ๕๔๖" }, padarupasiddhi: { ref: "ปท. ๕๖๒" } },
            { kaccayana: { pali: "นนฺทาทีหิ ยุ", ref: "กัจ. ๕๔๗" }, padarupasiddhi: { ref: "ปท. ๕๙๖" } },
            { kaccayana: { pali: "กตฺตุกรณปเทเสสุ จ", ref: "กัจ. ๕๔๘" }, padarupasiddhi: { ref: "ปท. ๕๙๗" } },
            { kaccayana: { pali: "รหาทิโต ณ", ref: "กัจ. ๕๔๙" }, padarupasiddhi: { ref: "ปท. ๕๕๐" } },
            { kaccayana: { pali: "อิติ กิพฺพิธานกปฺเป ปฐโม กณฺโฑ" } },
            { kaccayana: { pali: "ณาทโย เตกาลิกา", ref: "กัจ. ๕๕๐" }, padarupasiddhi: { ref: "ปท. ๕๔๖" } },
            { kaccayana: { pali: "สญฺญายํ ทาธาโต อิ", ref: "กัจ. ๕๕๑" }, padarupasiddhi: { ref: "ปท. ๕๙๘" } },
            { kaccayana: { pali: "ติ กิจฺจาสิฏฺเฐ", ref: "กัจ. ๕๕๒" }, padarupasiddhi: { ref: "ปท. ๖๐๙" } },
            { kaccayana: { pali: "อิตฺถิยมติยโว วา", ref: "กัจ. ๕๕๓" }, padarupasiddhi: { ref: "ปท. ๕๙๙" } },
            { kaccayana: { pali: "กรโต ริริย", ref: "กัจ. ๕๕๔" }, padarupasiddhi: { ref: "ปท. ๖๐๑" } },
            { kaccayana: { pali: "อตีเต ต ตวนฺตุ ตาวี", ref: "กัจ. ๕๕๕" }, padarupasiddhi: { ref: "ปท. ๖๑๒" } },
            { kaccayana: { pali: "ภาวกมฺเมสุ ต", ref: "กัจ. ๕๕๖" }, padarupasiddhi: { ref: "ปท. ๖๒๒" } },
            { kaccayana: { pali: "พุธ คมาทิตฺเถ กตฺตริ", ref: "กัจ. ๕๕๗" }, padarupasiddhi: { ref: "ปท. ๖๐๖" } },
            { kaccayana: { pali: "ชิโต อิน สพฺพตฺถ", ref: "กัจ. ๕๕๘" }, padarupasiddhi: { ref: "ปท. ๖๐๒" } },
            { kaccayana: { pali: "สุปโต จ", ref: "กัจ. ๕๕๙" }, padarupasiddhi: { ref: "ปท. ๖๐๓" } },
            { kaccayana: { pali: "อีสํทุสูหิ ข", ref: "กัจ. ๕๖๐" }, padarupasiddhi: { ref: "ปท. ๖๐๔" } },
            { kaccayana: { pali: "อิจฺฉตฺเถสุ สมานกตฺตุเกสุ ตเว ตุํ วา", ref: "กัจ. ๕๖๑" }, padarupasiddhi: { ref: "ปท. ๖๓๖" } },
            { kaccayana: { pali: "อรหสกฺกาทีสุ จ", ref: "กัจ. ๕๖๒" }, padarupasiddhi: { ref: "ปท. ๖๓๘" } },
            { kaccayana: { pali: "ปตฺตวจเน อลมตฺเถสุ จ", ref: "กัจ. ๕๖๓" }, padarupasiddhi: { ref: "ปท. ๖๓๙" } },
            { kaccayana: { pali: "ปุพฺพกาเลกกตฺตุกานํ ตุน ตฺวาน ตฺวา วา", ref: "กัจ. ๕๖๔" }, padarupasiddhi: { ref: "ปท. ๖๔๐" } },
            { kaccayana: { pali: "วตฺตมาเน มานนฺตา", ref: "กัจ. ๕๖๕" }, padarupasiddhi: { ref: "ปท. ๖๔๖" } },
            { kaccayana: { pali: "สาสาทีหิ รตฺถุ", ref: "กัจ. ๕๖๖" }, padarupasiddhi: { ref: "ปท. ๕๗๔" } },
            { kaccayana: { pali: "ปาทิโต ริตุ", ref: "กัจ. ๕๖๗" }, padarupasiddhi: { ref: "ปท. ๕๗๕" } },
            { kaccayana: { pali: "มานาทีหิ ราตุ", ref: "กัจ. ๕๖๘" }, padarupasiddhi: { ref: "ปท. ๕๗๖" } },
            { kaccayana: { pali: "อาคมา ตุโก", ref: "กัจ. ๕๖๙" }, padarupasiddhi: { ref: "ปท. ๖๑๐" } },
            { kaccayana: { pali: "ภพฺเพ อิก", ref: "กัจ. ๕๗๐" }, padarupasiddhi: { ref: "ปท. ๖๑๑" } },
            { kaccayana: { pali: "อิติ กิพฺพิธานกปฺเป ทุติโย กณฺโฑ" } },
            { kaccayana: { pali: "ปจฺจยาทนิฏฺฐา นิปาตนา สิชฺฌนฺติ", ref: "กัจ. ๕๗๑" }, padarupasiddhi: { ref: "ปท. ๖๒๔" } },
            { kaccayana: { pali: "สาสทิสโต ตสฺส ริฏฺโฐ จ", ref: "กัจ. ๕๗๒" }, padarupasiddhi: { ref: "ปท. ๖๒๕" } },
            { kaccayana: { pali: "สาทิ สนฺต ปุจฺฉ ภนฺช หํสาทีหิ ฏฺโฐ", ref: "กัจ. ๕๗๓" }, padarupasiddhi: { ref: "ปท. ๖๒๖" } },
            { kaccayana: { pali: "วสโต อุตฺถ", ref: "กัจ. ๕๗๔" }, padarupasiddhi: { ref: "ปท. ๖๑๓" } },
            { kaccayana: { pali: "วสฺส วา วุ", ref: "กัจ. ๕๗๕" }, padarupasiddhi: { ref: "ปท. ๖๑๔" } },
            { kaccayana: { pali: "ธ ฒ ภ เหหิ ธฒา จ", ref: "กัจ. ๕๗๖" }, padarupasiddhi: { ref: "ปท. ๖๐๗" } },
            { kaccayana: { pali: "ภนฺชโต คฺโค จ", ref: "กัจ. ๕๗๗" }, padarupasiddhi: { ref: "ปท. ๖๒๘" } },
            { kaccayana: { pali: "ภุชาทีนมนฺโต โน ทฺวิ จ", ref: "กัจ. ๕๗๘" }, padarupasiddhi: { ref: "ปท. ๕๖๐" } },
            { kaccayana: { pali: "วจ วา วุ", ref: "กัจ. ๕๗๙" }, padarupasiddhi: { ref: "ปท. ๖๒๙" } },
            { kaccayana: { pali: "คุปาทีนญฺจ", ref: "กัจ. ๕๘๐" }, padarupasiddhi: { ref: "ปท. ๖๓๐" } },
            { kaccayana: { pali: "ตราทีหิ อิณฺโณ", ref: "กัจ. ๕๘๑" }, padarupasiddhi: { ref: "ปท. ๖๑๖" } },
            { kaccayana: { pali: "ภิทาทิโต อินฺน อนฺน อีณา วา", ref: "กัจ. ๕๘๒" }, padarupasiddhi: { ref: "ปท. ๖๓๑" } },
            { kaccayana: { pali: "สุส ปจ สกโต กฺข กฺกา จ", ref: "กัจ. ๕๘๓" }, padarupasiddhi: { ref: "ปท. ๖๑๗" } },
            { kaccayana: { pali: "ปกฺกมาทีหิ นฺโต จ", ref: "กัจ. ๕๘๔" }, padarupasiddhi: { ref: "ปท. ๖๑๘" } },
            { kaccayana: { pali: "ชนาทีนมา ติมฺหิ จ", ref: "กัจ. ๕๘๕" }, padarupasiddhi: { ref: "ปท. ๖๑๙" } },
            { kaccayana: { pali: "คม ขน หน รมาทีนมนฺโต", ref: "กัจ. ๕๘๖" }, padarupasiddhi: { ref: "ปท. ๖๐๐" } },
            { kaccayana: { pali: "รกาโร จ", ref: "กัจ. ๕๘๗" }, padarupasiddhi: { ref: "ปท. ๖๓๒" } },
            { kaccayana: { pali: "ฐาปานมิอี จ", ref: "กัจ. ๕๘๘" }, padarupasiddhi: { ref: "ปท. ๖๒๐" } },
            { kaccayana: { pali: "หนฺเตหิ โห หสฺส โฬ วา อทหนหานํ", ref: "กัจ. ๕๘๙" }, padarupasiddhi: { ref: "ปท. ๖๒๑" } },
            { kaccayana: { pali: "อิติ กิพฺพิธานกปฺเป ตติโย กณฺโฑ" } },
            { kaccayana: { pali: "ณมฺหิ รนฺชสฺส โช ภาวกรเณสุ", ref: "กัจ. ๕๙๐" }, padarupasiddhi: { ref: "ปท. ๕๗๙" } },
            { kaccayana: { pali: "หนสฺส ฆาโต", ref: "กัจ. ๕๙๑" }, padarupasiddhi: { ref: "ปท. ๕๔๔" } },
            { kaccayana: { pali: "วโธ วา สพฺพตฺถ", ref: "กัจ. ๕๙๒" }, padarupasiddhi: { ref: "ปท. ๕๐๓" } },
            { kaccayana: { pali: "อาการนฺตานมาโย", ref: "กัจ. ๕๙๓" }, padarupasiddhi: { ref: "ปท. ๕๖๔" } },
            { kaccayana: { pali: "ปุรสมุปปรีหิ กโรติสฺส ข ขรา วา ตปฺปจฺจเยสุ จ", ref: "กัจ. ๕๙๔" }, padarupasiddhi: { ref: "ปท. ๕๘๒" } },
            { kaccayana: { pali: "ตเวตุนาทีสุ กา", ref: "กัจ. ๕๙๕" }, padarupasiddhi: { ref: "ปท. ๖๓๗" } },
            { kaccayana: { pali: "คมขนหนาทีนํ ตุํตพฺพาทีสุ น", ref: "กัจ. ๕๙๖" }, padarupasiddhi: { ref: "ปท. ๕๕๑" } },
            { kaccayana: { pali: "สพฺเพสํ ตุนาทีนํ โย", ref: "กัจ. ๕๙๗" }, padarupasiddhi: { ref: "ปท. ๖๔๑" } },
            { kaccayana: { pali: "จนนฺเตหิ รจฺจํ", ref: "กัจ. ๕๙๘" }, padarupasiddhi: { ref: "ปท. ๖๔๓" } },
            { kaccayana: { pali: "ทิสา สฺวานสฺวานฺตโลโป จ", ref: "กัจ. ๕๙๙" }, padarupasiddhi: { ref: "ปท. ๖๔๔" } },
            { kaccayana: { pali: "มหทเภหิ มฺม ยฺห ชฺช พฺภ ทฺธา จ", ref: "กัจ. ๖๐๐" }, padarupasiddhi: { ref: "ปท. ๖๔๕" } },
            { kaccayana: { pali: "ตทฺธิตสมาสกิตกา นามํวา ตเวตุนาทีสุ จ", ref: "กัจ. ๖๐๑" }, padarupasiddhi: { ref: "ปท. ๓๓๔" } },
            { kaccayana: { pali: "ทุมฺหิ ครุ", ref: "กัจ. ๖๐๒" }, padarupasiddhi: { ref: "ปท. ๖" } },
            { kaccayana: { pali: "ทีโฆ จ", ref: "กัจ. ๖๐๓" }, padarupasiddhi: { ref: "ปท. ๗" } },
            { kaccayana: { pali: "อกฺขเรหิ การ", ref: "กัจ. ๖๐๔" }, padarupasiddhi: { ref: "ปท. ๖๘๔" } },
            { kaccayana: { pali: "ยถาคมมิกาโร", ref: "กัจ. ๖๐๕" }, padarupasiddhi: { ref: "ปท. ๕๔๗" } },
            { kaccayana: { pali: "ทธนฺตโต โย กฺวจิ", ref: "กัจ. ๖๐๖" }, padarupasiddhi: { ref: "ปท. ๖๔๒" } },
            { kaccayana: { pali: "อิติ กิพฺพิธานกปฺเป จตุตฺโถ กณฺโฑ" } },
            { kaccayana: { pali: "นิคฺคหีตํ สํโยคาทิ โน", ref: "กัจ. ๖๐๗" }, padarupasiddhi: { ref: "ปท. ๕๗๘" } },
            { kaccayana: { pali: "สพฺพตฺถ เค คี", ref: "กัจ. ๖๐๘" }, padarupasiddhi: { ref: "ปท. ๖๒๓" } },
            { kaccayana: { pali: "สทสฺส สีทตฺตํ", ref: "กัจ. ๖๐๙" }, padarupasiddhi: { ref: "ปท. ๔๘๔" } },
            { kaccayana: { pali: "ยชสฺส สรสฺสิ ฏฺเฐ", ref: "กัจ. ๖๑๐" }, padarupasiddhi: { ref: "ปท. ๖๒๗" } },
            { kaccayana: { pali: "หจตุตฺถานมนฺตานํ โท เธ", ref: "กัจ. ๖๑๑" }, padarupasiddhi: { ref: "ปท. ๖๐๘" } },
            { kaccayana: { pali: "โฑ ฒกาเร", ref: "กัจ. ๖๑๒" }, padarupasiddhi: { ref: "ปท. ๖๑๕" } },
            { kaccayana: { pali: "คหสฺส ฆร เณ วา", ref: "กัจ. ๖๑๓" }, padarupasiddhi: { ref: "ปท. ๕๘๓" } },
            { kaccayana: { pali: "ทหสฺส โท ฬํ", ref: "กัจ. ๖๑๔" }, padarupasiddhi: { ref: "ปท. ๕๘๑" } },
            { kaccayana: { pali: "ธาตฺวนฺตสฺส โลโป กฺวิมฺหิ", ref: "กัจ. ๖๑๕" }, padarupasiddhi: { ref: "ปท. ๕๘๖" } },
            { kaccayana: { pali: "วิทนฺเต อู", ref: "กัจ. ๖๑๖" }, padarupasiddhi: { ref: "ปท. ๕๘๗" } },
            { kaccayana: { pali: "น ม ก รานมนฺตานํ นิยุตฺตตมฺหิ", ref: "กัจ. ๖๑๗" }, padarupasiddhi: { ref: "ปท. ๖๓๓" } },
            { kaccayana: { pali: "น ก คตฺตํ จชา ณฺวุมฺหิ", ref: "กัจ. ๖๑๘" }, padarupasiddhi: { ref: "ปท. ๕๗๑" } },
            { kaccayana: { pali: "กรสฺส จ ตตฺตํ ตุสฺมึ", ref: "กัจ. ๖๑๙" }, padarupasiddhi: { ref: "ปท. ๕๗๓" } },
            { kaccayana: { pali: "ตุํตุนตพฺเพสุ วา", ref: "กัจ. ๖๒๐" }, padarupasiddhi: { ref: "ปท. ๕๔๙" } },
            { kaccayana: { pali: "การิตํ วิย ณานุพนฺโธ", ref: "กัจ. ๖๒๑" }, padarupasiddhi: { ref: "ปท. ๕๕๓" } },
            { kaccayana: { pali: "อนกา ยุ ณฺวูนํ", ref: "กัจ. ๖๒๒" }, padarupasiddhi: { ref: "ปท. ๕๗๐" } },
            { kaccayana: { pali: "กคา จชานํ", ref: "กัจ. ๖๒๓" }, padarupasiddhi: { ref: "ปท. ๕๕๔" } },
            { kaccayana: { pali: "อิติ กิพฺพิธานกปฺเป ปญฺจโม กณฺโฑ" } },
            { kaccayana: { pali: "กิพฺพิธานสุตฺตํ นิฏฺฐิตํ" }, padarupasiddhi: { pali: "กิพฺพิธานสุตฺตํ นิฏฺฐิตํ" }, moggallana: { pali: "กิพฺพิธานสุตฺตํ นิฏฺฐิตํ" }, saddaniti: { pali: "กิพฺพิธานสุตฺตํ นิฏฺฐิตํ" } }
        ]
    }
];

const unadiTable8Data = [
    {
        topic: "ตารางที่ ๘. อุณาทิกปฺโป",
        formulas: [
            { kaccayana: { pali: "กตฺตริ กิตฺ.", ref: "กัจ. ๖๒๔" }, padarupasiddhi: { ref: "ปท. ๕๖๓" } },
            { kaccayana: { pali: "ภาวกมฺเมสุ กิจฺจ กฺต ขตฺถา.", ref: "กัจ. ๖๒๕" }, padarupasiddhi: { ref: "ปท. ๖๐๕" } },
            { kaccayana: { pali: "กมฺมนิ ทุติยายํ กฺโต.", ref: "กัจ. ๖๒๖" }, padarupasiddhi: { ref: "ปท. ๖๓๔" } },
            { kaccayana: { pali: "ขฺยาทีหิ มนฺ ม จ โต วา.", ref: "กัจ. ๖๒๗" }, padarupasiddhi: { ref: "ปท. ๖๕๒" } },
            { kaccayana: { pali: "สมาทีหิ ถมา.", ref: "กัจ. ๖๒๘" }, padarupasiddhi: { ref: "ปท. ๖๕๓" } },
            { kaccayana: { pali: "คหสฺสุปธสฺเส วา.", ref: "กัจ. ๖๒๙" }, padarupasiddhi: { ref: "ปท. ๕๖๙" } },
            { kaccayana: { pali: "มสุสฺส สุสฺส จฺฉรจฺเฉรา.", ref: "กัจ. ๖๓๐" }, padarupasiddhi: { ref: "ปท. ๖๕๔" } },
            { kaccayana: { pali: "อาปุพฺพจรสฺส จ.", ref: "กัจ. ๖๓๑" }, padarupasiddhi: { ref: "ปท. ๖๕๕" } },
            { kaccayana: { pali: "อล กล สเลหิ ลยา.", ref: "กัจ. ๖๓๒" }, padarupasiddhi: { ref: "ปท. ๖๕๖" } },
            { kaccayana: { pali: "ยาณ ลาณา.", ref: "กัจ. ๖๓๓" }, padarupasiddhi: { ref: "ปท. ๖๕๗" } },
            { kaccayana: { pali: "มถิสฺส ถสฺส โล จ.", ref: "กัจ. ๖๓๔" }, padarupasiddhi: { ref: "ปท. ๖๕๘" } },
            { kaccayana: { pali: "เปสาติสคฺคปตฺตกาเลสุ กิจฺจา.", ref: "กัจ. ๖๓๕" }, padarupasiddhi: { ref: "ปท. ๕๕๙" } },
            { kaccayana: { pali: "อวสฺสกาธมิเณสุ ณี จ.", ref: "กัจ. ๖๓๖" }, padarupasiddhi: { ref: "ปท. ๖๕๙" } },
            { kaccayana: { pali: "อรหสกฺกาทีหิ ตุํ.", ref: "กัจ. ๖๓๗" }, padarupasiddhi: { ref: "-" } },
            { kaccayana: { pali: "วชาทีหิ ปพฺพชฺชาทโย นิปจฺจนฺเต.", ref: "กัจ. ๖๓๘" }, padarupasiddhi: { ref: "ปท. ๖๖๐" } },
            { kaccayana: { pali: "กฺวิ โลโป จ.", ref: "กัจ. ๖๓๙" }, padarupasiddhi: { ref: "ปท. ๕๘๕" } },
            { kaccayana: { pali: "สจชานํ กคา ณานุพนฺเธ.", ref: "กัจ. ๖๔๐" }, padarupasiddhi: { ref: "-" } },
            { kaccayana: { pali: "นุทาทีหิ ยุณฺวูนมนานนากานนกา สการิเตหิ จ.", ref: "กัจ. ๖๔๑" }, padarupasiddhi: { ref: "ปท. ๕๗๒" } },
            { kaccayana: { pali: "อิ ย ต ม กิ เอสานมนฺตสฺสโร ทีฆํ กฺวจิ ทิสสฺส คุณํ โท รํ สกฺขี จ.", ref: "กัจ. ๖๔๒" }, padarupasiddhi: { ref: "ปท. ๕๘๘" } },
            { kaccayana: { pali: "ภฺยาทีหิ มติ พุธิ ปูชาทีหิ จ กฺโต.", ref: "กัจ. ๖๔๓" }, padarupasiddhi: { ref: "ปท. ๖๓๕" } },
            { kaccayana: { pali: "เวปุ สี ทว วมุ กุ ทา ภู หฺวาทีหิ ถุ ตฺติม ณิมา นิพฺพตฺเต.", ref: "กัจ. ๖๔๔" }, padarupasiddhi: { ref: "ปท. ๖๖๑" } },
            { kaccayana: { pali: "อกฺโกเส นมฺหานิ.", ref: "กัจ. ๖๔๕" }, padarupasiddhi: { ref: "ปท. ๖๖๒" } },
            { kaccayana: { pali: "เอกาทิโต สกิสฺส กฺขตฺตุํ.", ref: "กัจ. ๖๔๖" }, padarupasiddhi: { ref: "ปท. ๔๑๙" } },
            { kaccayana: { pali: "สุนสฺสุนสฺโสณ วานุวานูนุนขุนานา.", ref: "กัจ. ๖๔๗" }, padarupasiddhi: { ref: "ปท. ๖๖๓" } },
            { kaccayana: { pali: "ตรุณสฺส สุสุ จ.", ref: "กัจ. ๖๔๘" }, padarupasiddhi: { ref: "ปท. ๖๖๔" } },
            { kaccayana: { pali: "ยุวสฺสุวสฺสุวุวานุนูนา.", ref: "กัจ. ๖๔๙" }, padarupasiddhi: { ref: "ปท. ๖๖๕" } },
            { kaccayana: { pali: "กาเล วตฺตมานาตีเต ณฺวาทโย.", ref: "กัจ. ๖๕๐" }, padarupasiddhi: { ref: "ปท. ๖๕๑" } },
            { kaccayana: { pali: "ภวิสฺสติ คมาทีหิ ณี ฆิณฺ.", ref: "กัจ. ๖๕๑" }, padarupasiddhi: { ref: "ปท. ๖๔๗" } },
            { kaccayana: { pali: "กฺริยายํ ณฺวุตโว.", ref: "กัจ. ๖๕๒" }, padarupasiddhi: { ref: "ปท. ๖๔๘" } },
            { kaccayana: { pali: "ภาววาจิมฺหิ จตุตฺถี.", ref: "กัจ. ๖๕๓" }, padarupasiddhi: { ref: "ปท. ๓๐๗" } },
            { kaccayana: { pali: "กมฺมนิ โณ.", ref: "กัจ. ๖๕๔" }, padarupasiddhi: { ref: "ปท. ๖๔๙" } },
            { kaccayana: { pali: "เสเส สฺสํ นฺตุ มานานา.", ref: "กัจ. ๖๕๕" }, padarupasiddhi: { ref: "ปท. ๖๕๐" } },
            { kaccayana: { pali: "ฉทาทีหิ ตตฺรณฺ.", ref: "กัจ. ๖๕๖" }, padarupasiddhi: { ref: "ปท. ๖๖๖" } },
            { kaccayana: { pali: "วทาทีหิ ณิตฺโต คเณ.", ref: "กัจ. ๖๕๗" }, padarupasiddhi: { ref: "ปท. ๖๖๗" } },
            { kaccayana: { pali: "มิทาทีหิ ตฺติ ติโย.", ref: "กัจ. ๖๕๘" }, padarupasiddhi: { ref: "ปท. ๖๖๘" } },
            { kaccayana: { pali: "อุสุรนฺชทํสานํ ทํสสฺส ทฑฺโฒ ฒ ฐา จ.", ref: "กัจ. ๖๕๙" }, padarupasiddhi: { ref: "ปท. ๖๖๙" } },
            { kaccayana: { pali: "สูวุสานมูวุสานมโต โถ จ.", ref: "กัจ. ๖๖๐" }, padarupasiddhi: { ref: "ปท. ๖๗๐" } },
            { kaccayana: { pali: "รนฺชุทาทีหิ ธทิทฺทกิรา กฺวจิ ชทโลโป จ.", ref: "กัจ. ๖๖๑" }, padarupasiddhi: { ref: "ปท. ๖๗๑" } },
            { kaccayana: { pali: "ปฏิโต หิสฺส เหรณฺ หีรณฺ.", ref: "กัจ. ๖๖๒" }, padarupasiddhi: { ref: "ปท. ๖๗๒" } },
            { kaccayana: { pali: "กฑฺยาทีหิ โก.", ref: "กัจ. ๖๖๓" }, padarupasiddhi: { ref: "ปท. ๖๗๓" } },
            { kaccayana: { pali: "ขาทามคมานํ ขนฺธนฺธคนฺธา.", ref: "กัจ. ๖๖๔" }, padarupasiddhi: { ref: "ปท. ๖๗๔" } },
            { kaccayana: { pali: "ปฏาทีหฺยลํ.", ref: "กัจ. ๖๖๕" }, padarupasiddhi: { ref: "ปท. ๖๗๕" } },
            { kaccayana: { pali: "ปุถสฺส ปุถุ ปถาโม วา.", ref: "กัจ. ๖๖๖" }, padarupasiddhi: { ref: "ปท. ๖๗๖" } },
            { kaccayana: { pali: "สสฺวาทีหิ ตุ ทโว.", ref: "กัจ. ๖๖๗" }, padarupasiddhi: { ref: "ปท. ๖๗๗" } },
            { kaccayana: { pali: "จฺยาทีหิ อีวโร.", ref: "กัจ. ๖๖๘" }, padarupasiddhi: { ref: "ปท. ๖๗๘" } },
            { kaccayana: { pali: "มุนาทีหิ จิ.", ref: "กัจ. ๖๖๙" }, padarupasiddhi: { ref: "ปท. ๖๗๙" } },
            { kaccayana: { pali: "วิทาทีหฺยูโร.", ref: "กัจ. ๖๗๐" }, padarupasiddhi: { ref: "ปท. ๖๘๐" } },
            { kaccayana: { pali: "หนาทีหิ นุ ณุ ตโว.", ref: "กัจ. ๖๗๑" }, padarupasiddhi: { ref: "ปท. ๖๘๑" } },
            { kaccayana: { pali: "กุฏาทีหิ โฐ.", ref: "กัจ. ๖๗๒" }, padarupasiddhi: { ref: "ปท. ๖๘๒" } },
            { kaccayana: { pali: "มนุปูรสุณาทีหิ อุสฺสนุสิสา.", ref: "กัจ. ๖๗๓" }, padarupasiddhi: { ref: "ปท. ๖๘๓" } },
            { kaccayana: { pali: "อิติ กิพฺพิธานกปฺเป อุณาทิกปฺโป ฉฏฺโฐ กณฺโฑ." } },
            { kaccayana: { pali: "อุณาทิสุตฺตํ นิฏฺฐิตํ." }, padarupasiddhi: { pali: "อุณาทิสุตฺตํ นิฏฺฐิตํ" }, moggallana: { pali: "อุณาทิสุตฺตํ นิฏฺฐิตํ" }, saddaniti: { pali: "อุณาทิสุตฺตํ นิฏฺฐิตํ" } },
            { kaccayana: { pali: "กจฺจายนสุตฺตํ นิฏฺฐิตํ." }, padarupasiddhi: { pali: "กจฺจายนสุตฺตํ นิฏฺฐิตํ" }, moggallana: { pali: "กจฺจายนสุตฺตํ นิฏฺฐิตํ" }, saddaniti: { pali: "กจฺจายนสุตฺตํ นิฏฺฐิตํ" } }
        ]
    }
];
