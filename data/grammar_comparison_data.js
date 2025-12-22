const grammarComparisonData = [
    // =========================================================
    // หมวดที่ ๑: สัญญาวิธาน (อักษรและบัญญัติเบื้องต้น)
    // =========================================================
    {
        topic: "๑. สัญญาวิธาน (ว่าด้วยอักษรและการขนานนาม)",
        formulas: [
            {
                kaccayana: {
                    pali: "อตฺโถ อกฺขรสญฺญาโต",
                    thai: "เนื้อความ อันรู้อได้ด้วยอักษร",
                    desc: "อักษรเป็นเครื่องหมายให้รู้เนื้อความ ถ้ารู้อักษรก็รู้เนื้อความได้",
                    ref: "กัจ. ๑"
                },
                padarupasiddhi: {
                    pali: "อตฺโถ อกฺขรสญฺญาโต",
                    thai: "เนื้อความ อันรู้อได้ด้วยอักษร",
                    desc: "เหมือนกัจจายนะ เป็นรากฐานการเรียนบาลี",
                    ref: "ปท. ๑"
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
                    pali: "อํ พฺยญฺชเน นิคฺคหีตํ",
                    ref: "กัจ. ๓๐"
                },
                padarupasiddhi: {
                    ref: "ปท. ๕๘"
                }
            },
            {
                kaccayana: {
                    pali: "วคฺคนฺตํ วา วคฺเค",
                    ref: "กัจ. ๓๑"
                },
                padarupasiddhi: {
                    ref: "ปท. ๔๙"
                }
            },
            {
                kaccayana: {
                    pali: "เอเห ญํ",
                    ref: "กัจ. ๓๒"
                },
                padarupasiddhi: {
                    ref: "ปท. ๕๐"
                }
            },
            {
                kaccayana: {
                    pali: "ส เย จ",
                    ref: "กัจ. ๓๓"
                },
                padarupasiddhi: {
                    ref: "ปท. ๕๑"
                }
            },
            {
                kaccayana: {
                    pali: "มทา สเร",
                    ref: "กัจ. ๓๔"
                },
                padarupasiddhi: {
                    ref: "ปท. ๕๒"
                }
            },
            {
                kaccayana: {
                    pali: "ย ว ม ท น ต ร ลา จาคมา",
                    ref: "กัจ. ๓๕"
                },
                padarupasiddhi: {
                    ref: "ปท. ๓๔"
                }
            },
            {
                kaccayana: {
                    pali: "กฺวจิ โอ พฺยญฺชเน",
                    ref: "กัจ. ๓๖"
                },
                padarupasiddhi: {
                    ref: "ปท. ๔๗"
                }
            },
            {
                kaccayana: {
                    pali: "นิคฺคหีตญฺจ",
                    ref: "กัจ. ๓๗"
                },
                padarupasiddhi: {
                    ref: "ปท. ๕๗"
                }
            },
            {
                kaccayana: {
                    pali: "กฺวจิ โลปํ",
                    ref: "กัจ. ๓๘"
                },
                padarupasiddhi: {
                    ref: "ปท. ๕๓"
                }
            },
            {
                kaccayana: {
                    pali: "พฺยญฺชเน จ",
                    ref: "กัจ. ๓๙"
                },
                padarupasiddhi: {
                    ref: "ปท. ๕๔"
                }
            },
            {
                kaccayana: {
                    pali: "ปโร วา สโร",
                    ref: "กัจ. ๔๐"
                },
                padarupasiddhi: {
                    ref: "ปท. ๕๕"
                }
            },
            {
                kaccayana: {
                    pali: "พฺยญฺชโน จ วิสญฺโญโค",
                    ref: "กัจ. ๔๑"
                },
                padarupasiddhi: {
                    ref: "ปท. ๕๖"
                }
            },
            {
                kaccayana: {
                    pali: "อกฺขราปาทโย เอกจตฺตาลีสํ",
                    thai: "อักษรทั้งหลาย มี อ เป็นต้น มี ๔๑ ตัว",
                    desc: "กำหนดจำนวนอักษรบาลีสากล ๔๑ ตัว (สระ ๘ พยัญชนะ ๓๓)",
                    ref: "กัจ. ๒"
                },
                padarupasiddhi: {
                    pali: "อกฺขราปาทโย เอกจตฺตาลีสํ",
                    thai: "อักษรทั้งหลาย มี อ เป็นต้น มี ๔๑ ตัว",
                    desc: "ตามนัยกัจจายนะ",
                    ref: "ปท. ๒"
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
                padarupasiddhi: {
                    pali: "ตตฺโถทนฺตา สรา อฏฺฐ",
                    thai: "ในอักษรเหล่านั้น อักษรสุดที่ โอ ชื่อว่า สระ มี ๘ ตัว",
                    desc: "เหมือนกัจจายนะ",
                    ref: "ปท. ๓"
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
                padarupasiddhi: {
                    pali: "ลหุมตฺตา ตโย รสฺสา",
                    thai: "สระมีมาตราเบา ๓ ตัว ชื่อว่า รัสสะ",
                    desc: "เหมือนกัจจายนะ",
                    ref: "ปท. ๔"
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
                padarupasiddhi: {
                    pali: "อญฺเญ ทีฆา",
                    thai: "สระเหล่าอื่น ชื่อว่า ทีฆะ",
                    desc: "เหมือนกัจจายนะ",
                    ref: "ปท. ๕"
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
                },
                padarupasiddhi: {
                    ref: "ปท. ๘"
                }
            },
            {
                kaccayana: {
                    pali: "วคฺคา ปญฺจปญฺจโส มนฺตา",
                    ref: "กัจ. ๗"
                },
                padarupasiddhi: {
                    ref: "ปท. ๙"
                }
            },
            {
                kaccayana: {
                    pali: "อํอิติ นิคฺคหีตํ",
                    ref: "กัจ. ๘"
                },
                padarupasiddhi: {
                    ref: "ปท. ๑๐"
                }
            }
        ]
    },
    // =========================================================
    // หมวดที่ ๒: สนธิ (การต่อศัพท์)
    // =========================================================
    {
        topic: "๒. สนธิ (การต่อศัพท์)",
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
        topic: "๓. นามกัณฑ์ (ว่าด้วยลิงค์ วจนะ วิภัตติ)",
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
        topic: "๔. การก (หน้าที่ของนามในประโยค)",
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
        topic: "๕. สมาส (การย่อนามศัพท์)",
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
        topic: "๖. ตัทธิต (ปัจจัยนาม)",
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
        topic: "๗. อาขยาต (กิริยาศัพท์)",
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
        topic: "๘. กิตก์ (ศัพท์ที่ประกอบด้วยปัจจัยหมู่หนึ่ง)",
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

const sandhiTable1Data = [
    {
        topic: "ตารางที่ ๑ — ๑. สนฺธิกปฺโป",
        formulas: [
            {
                kaccayana: { pali: "อตฺโถ อกฺขรสญฺญาโต", ref: "กัจ. ๑" },
                padarupasiddhi: { ref: "ปท. ๑" }
            },
            {
                kaccayana: { pali: "อกฺขราปาทโย เอกจตฺตาฬีสํ", ref: "กัจ. ๒" },
                padarupasiddhi: { ref: "ปท. ๒" }
            },
            {
                kaccayana: { pali: "ตตฺโถทนฺตา สรา อฏฺฐ", ref: "กัจ. ๓" },
                padarupasiddhi: { ref: "ปท. ๓" }
            },
            {
                kaccayana: { pali: "ลหุมตฺตา ตโย รสฺสา", ref: "กัจ. ๔" },
                padarupasiddhi: { ref: "ปท. ๔" }
            },
            {
                kaccayana: { pali: "อญฺเญ ทีฆา", ref: "กัจ. ๕" },
                padarupasiddhi: { ref: "ปท. ๕" }
            },
            {
                kaccayana: { pali: "เสสา พฺยญฺชนา", ref: "กัจ. ๖" },
                padarupasiddhi: { ref: "ปท. ๘" }
            },
            {
                kaccayana: { pali: "วคฺคา ปญฺจปญฺจโส มนฺตา", ref: "กัจ. ๗" },
                padarupasiddhi: { ref: "ปท. ๙" }
            },
            {
                kaccayana: { pali: "อํอิติ นิคฺคหีตํ", ref: "กัจ. ๘" },
                padarupasiddhi: { ref: "ปท. ๑๐" }
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
                padarupasiddhi: { ref: "ปท. ๑๔" }
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
                padarupasiddhi: { ref: "ปท. ๑๕" }
            },
            {
                kaccayana: { pali: "กฺวจาสวณฺณํ ลุตฺเต", ref: "กัจ. ๑๔" },
                padarupasiddhi: { ref: "ปท. ๑๖" }
            },
            {
                kaccayana: { pali: "ทีฆํ", ref: "กัจ. ๑๕" },
                padarupasiddhi: { ref: "ปท. ๑๗" }
            },
            {
                kaccayana: { pali: "ปุพฺโบ จ", ref: "กัจ. ๑๖" },
                padarupasiddhi: { ref: "ปท. ๑๘" }
            },
            {
                kaccayana: { pali: "ยเมทนฺตสฺสาเดโส", ref: "กัจ. ๑๗" },
                padarupasiddhi: { ref: "ปท. ๑๙" }
            },
            {
                kaccayana: { pali: "วโมดุทนฺตานํ", ref: "กัจ. ๑๘" },
                padarupasiddhi: { ref: "ปท. ๒๐" }
            },
            {
                kaccayana: { pali: "สพฺโบ จํ ติ", ref: "กัจ. ๑๙" },
                padarupasiddhi: { ref: "ปท. ๒๒" }
            },
            {
                kaccayana: { pali: "โท ธสฺส จ", ref: "กัจ. ๒๐" },
                padarupasiddhi: { ref: "ปท. ๒๗" }
            },
            {
                kaccayana: { pali: "อิวณฺโณ ยํ นวา", ref: "กัจ. ๒๑" },
                padarupasiddhi: { ref: "ปท. ๒๑" }
            },
            {
                kaccayana: { pali: "เอวาทิสฺส ริ ปุพฺโบ จ รสฺโส", ref: "กัจ. ๒๒" },
                padarupasiddhi: { ref: "ปท. ๒๘" }
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
        topic: "ตารางที่ ๒ — ๒. นามกปฺโป",
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
