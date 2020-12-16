# Design Git Branch

## ใช้ประจำ

> เริ่มงาน

- git branch
- git checkout feature/profile_management
  > ก่อนทำการ Merge
- git status
- git add .
- git status
- git commit -m "testtest"
- git push
- git checkout develop
- git merge feature/profile_management
- git checkout master
- git merge develop

> รวม branch master กับ branch feature แบบ fast forward

- git checkout feature/profile_management
- git merge master
- git merge develop
- git push

> merge แบบ ปกติ

- git checkout master
- git merge develop
- git merge feature/profile_management

## Branch

- 1. master <---- เป็น branch ที่มีอยู่ก่อนหน้านี้อยู่แล้ว
- 2. develop
- 3. feature
- 4. release
- 5. hotfix

## Git Flow

**git flow เจ้านี้จะมาดึงความสามารถของ การใช้ Branch ได้อย่างมีประสิทธิภาพมากขึ้น โดยผมจะแยก Branch ออกเป็น 5 Branch**

> 1. **branch master** ใช้สำหรับเก็บ Project ตอนเป็น product ซึ่งหลักจากผ่านการ test
> 2. **branch develop** นี้เราจะต้องแตกมาจาก **branch master** ใช้สำหรับ test หา bug , error

<<<<<<< HEAD

```git
# ถ้าตอนนี้เราอยู่ใน branch master เราจะทำการสร้าง branch develop ขึ้นมาโดยใช้
$ git branch develop
# จากนั้นเราจะทำการเข้าไปใช้ branch develop นั้น
$ git checkout develop
$ git branch # ตรวจสอบ branch ของเรา
$ git branch --all # ตรวจสอบ branch ของเราทั้งหมด
$ git branch --delete develop # ลบ branch ชื่อ develop
```

> 3. **branch feature** นี้เราจะต้องแตกมาจาก **branch develop** เท่านั้น [ย้ำตัวหนาๆ เลย]ใช้สำหรับ ใว้ให้ นักพัฒนาของเราพัฒนา feature แต่ละส่วน โดยเราจะแบ่งงานอย่างชัดเจน เช่น อย่างเราจะทำ ระบบสมาชิก เราก็จะแบ่งออกเป็นงานเลย ก็จะมี สมัครสมาชิก , เข้าสู่ระบบ , ระบบ Profile และ อื่นๆ ซึ่งเวลาเราแยก branch ออกเราก็แยกเป็น feature ไปเลย เช่น สมัครสมาชิก => feature/register อย่างงี้เป็นต้น เราจะไม่เอา งานที่เราทำเข้าสู่ระบบสมาชิก เด็ดขาดไม่งันเราก็ต้องกลับไปเจอปัญหาเดิมที่เคยกล่าว Conflict _ถ้าเราทำเสร็จก็ทำการ ลบ branch ทิ้งไป หรือใครอยากเก็บไว้ก็แล้วแต่_ แต่มันจะเยอะมาก เพราะ 1 project ของเราคงไม่มีแค่งานเดียวหรอกใช้ไหม

```git
# เราต้อง checkout ไปที่ branch develop ก่อน
$ git checkout develop
# ทำการ สร้าง feature ชื่อว่า profile_management
$ git branch feature/profile_management
# จากนั้นทำการ checkout branch feature/profile_management เพื่อใช้งาน
$ git checkout feature/profile_management
```

=======

                    # ถ้าตอนนี้เราอยู่ใน branch master เราจะทำการสร้าง branch develop ขึ้นมาโดยใช้
    =============|> $ git branch develop
                    # จากนั้นเราจะทำการเข้าไปใช้ branch develop นั้น
    =============|> $ git checkout develop
    =============|> $ git branch # ตรวจสอบ branch ของเรา
    =============|> $ git branch --all # ตรวจสอบ branch ของเราทั้งหมด
    =============|> $ git branch --delete develop # ลบ branch ชื่อ develop

> 3. **branch feature** นี้เราจะต้องแตกมาจาก **branch develop** เท่านั้น [ย้ำตัวหนาๆ เลย]ใช้สำหรับ ใว้ให้ นักพัฒนาของเราพัฒนา feature แต่ละส่วน โดยเราจะแบ่งงานอย่างชัดเจน เช่น อย่างเราจะทำ ระบบสมาชิก เราก็จะแบ่งออกเป็นงานเลย ก็จะมี สมัครสมาชิก , เข้าสู่ระบบ , ระบบ Profile และ อื่นๆ ซึ่งเวลาเราแยก branch ออกเราก็แยกเป็น feature ไปเลย _เช่น สมัครสมาชิก => feature/register_ อย่างงี้เป็นต้น เราจะไม่เอา งานที่เราทำเข้าสู่ระบบสมาชิก เด็ดขาดไม่งันเราก็ต้องกลับไปเจอปัญหาเดิมที่เคยกล่าว Conflict _ถ้าเราทำเสร็จก็ทำการ ลบ branch ทิ้งไป หรือใครอยากเก็บไว้ก็แล้วแต่_ แต่มันจะเยอะมาก เพราะ 1 project ของเราคงไม่มีแค่งานเดียวหรอกใช้ไหม

                    # เราต้อง checkout ไปที่ branch develop ก่อน
    =============|> $ git checkout develop
                    # ทำการ สร้าง feature ชื่อว่า profile_management
    =============|> $ git branch feature/profile_management
                    # จากนั้นทำการ checkout branch feature/profile_management เพื่อใช้งาน
    =============|> $ git checkout feature/profile_management

> เมื่อเราทำงานส่วนของ feature แต่ละตัวเรียบร้อยแล้วถึงขั้นตอน merge code ขั้นตอนนนี้ก็ไม่ยาก ก่อนอื่นอย่าลืม git commit , git push ให้เรียบร้อยก่อนนะ

                    # จากนั้นเราจะทำการกลับไปที่ branch develop
    =============|> $ git checkout develop
                    # แล้วทำการ merge code เข้ามาใน develop
    =============|> $ git merge feature/profile_management
                    # ทำการลบ branch feature/profile_management
    =============|> $ git branch --delete feature/profile_management

- ก็เป็นการเรียบร้อย
- แต่ แต่ แต่ …..
- มีใครเอะใจไหม ว่าเห้ยจริงหรอที่ใครก็ได้จะทำการ merge เข้า develop ได้ ผมลองยกตัวอย่าง เมื่อเราทำระบบ profile เสร็จแล้วใช้ไหม เราก็ไปทำงานอื่นต่อเพราะเรา test ในเครื่องเราทำงานได้ ปกติ ….. พอตก 1 เดือนผ่านไป วันที่เราเอา code มารวมกับเพื่อนใน branch develop เพื่อที่จะ test ดันมาเกิดปัญหาใน ส่วน profile ที่เราทำสะได้ งานงอกละทีนี้ตรูเขียนอะไรไปแวะเนีย ลืมไปหมดแล้ว แทนที่เราจะได้ทำ งานที่วาง timeline ในวันนี้ก็กลายเป็นแก้ไขงานเดิมไป หนึ่งวัน
  แต่ที่จริงวิธีนี้ก็มีทางแก้ไข ( เพราะทุกปัญหามีทางออก ) เราก็มาใช้ review code สิ จบเรื่อง แต่ review code มันใช้ไงพี่ เดียวแปะ บทความนี้ลองอ่านกันดูน่าจะพอเห็นภาพมันมากขึ้น

> 4. release
>
> - ใช้สำหรับตาม tester [กดเพื่ออ่านเ release ต่อ](https://medium.com/amiearth/%E0%B8%A1%E0%B8%B2%E0%B8%97%E0%B8%B3%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81-git-branch-560c23e67eb6)

> 5. hotfix
>
> - ที่จะทำการแก้ไข _branch master_ เท่านั้น โดย branch นี้หน้าที่หลักๆ เราจะเอาไว้แก้ไข แบบกระทันหัน เช่น เมื่อลูกค้าต้องการให้แก้ไขบ่างส่วนแบบด่วน เราก็เอามาแก้ไขใน branch นี้นั้นเอง อันนี้จะเป็นตัวอย่างที่ผมเริ่มทำ project เพียงไม่กี่คน นะ

## Git Tag

git tag จะเป็นการวางตำแหน่ง mark ไว้ว่าโปรแกรมที่เราพัฒนาอยู่ ใน commit นี้เป็น version อะไรแล้ว โดยส่วนมากจะ mark ไว้ที่ trunk (เส้นหลัก ใช้กับ master หรือ release ก็ได้) ว่า version ที่เราได้ปล่อยไปนี้เราพัฒนาอยู่ version อะไรแล้ว

# สร้าง tag ขึ้นมา

$ git tag <tagname>
$ git tag my_tag

# สร้าง tag ขึ้นมาแบบระบุข้อความ

$ git tag -a <tagname> -m "message"
$ git tag -a my_tag -m "crate tag v0.0.1"

# แสดง tag ทั้งหมด

$ git tag
$ git tag -l
$ git tag -list
#ลบแท็กชื่อ my_tag
$git tag --delete my_tag
#ส่งแท็กขึ้นไปที่ Remote Repository
$git push origin <tag name>
#ส่งแท็กทั้งหมดขึ้นไปที่ Remote Repository
$git push origin --tags
#ลบแท็กที่ Remote Repository
$git push --delete origin <tag name>

# Git Merge

                    # ทำการ checkout ไป branch master ก่อน
                    $ git checkout master
                    # ทำการ merge branch A เข้าไป branch master
                    $ git merge A
                    # ทำการ merge branch B เข้าไป branch master
                    $ git merge B
                    # รวม branch master กับ branch feature แบบ no fast forward
                    $ git merge --no-ff < branch >
                    # รวม branch master กับ branch feature แบบ fast forward
    =============|> $ git merge < branch >

# Git Checkout

git checkout เป็นคำสั่งที่ใช้สำหรับสลับ ไปยัง branch หรือ Commit ที่เราเคยสร้างไว้

                    # สร้าง branch ชื่อ test และทำการสลับการทำงานมาที่ Branch นี้
                    $ git checkout -b test



# เข้าใจ Fork และ Pull Request

[กดเพื่ออ่านเ release ต่อ](https://medium.com/amiearth/%E0%B8%A1%E0%B8%B2%E0%B8%97%E0%B8%B3%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81-git-branch-560c23e67eb6)

> > > > > > > develop
