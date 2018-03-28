#### IMPORTANCE LEGEND:
MUST BE DONE / ТРЯБВА ДА СЕ НАПРАВЯТ
---------------
1 - necessary / Необходимо
2 - important / Важно
--------------
SHOULD BE DONE / Би било хубаво да се направят
---------------
3 - Optional / Не е задължително
--------------
NICE CHANGE BUT WE CAN GO WITHOUT IT / Хубава промяна, но може и без нея
--------------
4 - If there is time / Ако остане време
#### STATUSES:
1. Completed / Завършено
2. In Progress / Работи се по него.
3. Not started / Не е започнато.
4. Abandoned / Изоставено.


# **ToDos:**
## **Routes and Controllers:**
###    **1. validate the form data with express-validator / да се валидира информацията от формата преди да се прати към базата**
####    **Importance: 1**.
        - not to allow fields that cannot be empty to remain empty / да не се позволява на полета, които не могат да бъдат
            празни да са празни при пращането на завяката
            Example/Пример:
                - Create post form:
                    - post name, post content, subreaditId, userId cannot be null
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**


###    **2. Fix the positive flash messages when a user is logged in or a post/comment is created**
        Да се оправи бъга с позитивните флаш съобщения към юзера, когато се логнат или създадат пост / коментар
####    **Importance: 2.**
        - At the moment when the user attempts to log-in with invalid user/password, or attempting to register with a user that already exists, but I could not get it to work for the green - positive - messages on success
        there are error flash messages that appear on top of the forms warning of the error
        - В момента, когато се юзера се опита да се логне с невалидна информация (име/парола), или се опита да се регистрира с информацията на юзер, който вече съществува се появяват червено съобщение над формата предупреждавайки за грешката, но не успях да го направя да работи със зелените - позитивни - съобщения при успех.
        - This is qualified as a bug, as the code and the pug are in the files, but it does not work and I do not know why :)
        - Това се квалифицира като бъг, защото кода и пъг-файла са във файловете, но просто не работи и не знам защо :)
        **Example/ Пример:**
            - Create a new post:
                - there should be a green message that appears informing the user of the successful creation of the post
        Helping materials/ Помощни материяли:
            [YouTube Message & Validation by Travesty Media](https://www.youtube.com/watch?v=rBzCvbA0Dls)
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**


###     **3. Create RESTful API routes**
        Да се направят API 'пътища'
####    **Importance: 1**
        As it is a requirement for the project this must be done.
        Тъй като това е задължително изискване за проекта, то трябва да се направи.
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:** -----> Mario
#####   **STATUS:** -----> Completed


###     **4.Create DELETE routes for comments and posts**
        Да се направят пътища за триене на коментари и постове.
####    **Importance: 2**
        - At the moment the user can only create comments and posts, but once they are created the user does not have the ability to amend or delete the comments/posts. This is a horrible user experience and when in production it will polute the app with unwanted comments that cannot be deleted.
        - В момента юзера може само да създава коментари и постове, но един път създадени, юзера не може да ги променя или трие. Това ужасно поведение на апликцаията от гледна точка на юзерите, и когато апликцията е в стадий на продукция, тя ще е замърсена с нежелани коментари, които не могат да бъдат изтрити.
#####   **IMPORTANT / ВАЖНО: The user must be able to delete ONLY their comment/post. Юзера трябва да може да трие САМО тяхните                   коментари/постове.**
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**


###     **5. Create PUT routes for comments and posts and user information**
        Да се направят пътища за променяне на коментари и постове и информацията на юзера.
####    **Importance: 3**
        - The user can only choose their avatar upon registering and do not have the option to amend it at a later stage, moreover the avatars use links from the web and if the source deletes or amends the link for the image, the user is left with a '404 cannot be found' picture as an avatar forever.
        - Юзера може да избира своя аватар само при регистрация и нямата опцията да я променят по-късно, допълнително аватарите използват линкове от интернет и ако източника на картинката изтрие или промени линка, юзера е оставен с аватар '404 не може да бъде намерена' завинаги.
        - After the implementation of feature 4, the user will be able to delete their comment or their post, but they still cannot amend the comment/post. This is an optional requirement, as it will boost the user experience, but it is not detrimental to the success of the project.
        - След имплементирането на функционалност 4, юзера ще може да изтрие коментара си ли поста си, но няма да могат да го променят. Това не е задължително изискване, но ще подобри подребителското използване на сайта, но няма да навреди на успеха на проекта.
#####   IMPORTANT / ВАЖНО: The user must be able to amend ONLY their information/comment/post. Юзера трябва да може да променя САМО               тяхната информация/коментар/пост.
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**


###     **6. Create ADMIN page and admin rights**
        Да се направи страница за администратори и да има юзери с администраторски права
####    **Importance: 4**
#####   WARNING/ВНИМАНИЕ: This task requires a lot of work as it will include: front-end work, routes and controllers work and changes to the database and database models. Тази задача изисква много работа, защото включва: фронт-енд работа, работа по пътищата и контролерите и промени по базата от данни и моделите в базата от данни. 
        - This change will be nice for the scaling of the application as it currently only has 3 subreadits and after implementing the above features, only the users can delete or amend their comments, posts and information. Having admins would ensure that more subreadits are added when requested by the users by a form that will be sent to the admins. Additionally, the admins can keep the site clean of profanity and unrelated topics being posted, which will enhance the user experience greately.
        - Това би била добра промяна за разширяването на апликцаията, тъй като в момент имаме само 3 събредита и след имплементирането на горните функционалности, само юзерите могат да трият или променят тяхните коментари, постове и информация. Ако имаме администратори, те ще могат да се погрижат да има повече събредити, когато се направи заявка от потребител, чрез форма, за създаване на нов събредит и тази заявка ще бъде пращана към администраторите. Допълнително, администраторите ще поддържат апликцаията чиста от ругатни и създаването на несъотвестващи постове или коментари в грешните събредити, което на свой ред ще подобри потребителското използване на сайта.
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**

###     **7. Use an additional database like MongoDB or Redis to cache cookies/sessions**
        Да се използва допълнителна база от данни като MongoDB или Redis за кеширане на бисквитките/сесията
####    **Importance: 3**
        - This feature will increase the user experience as the user will not have to log-in every time the server is restarted.
        - Тази функционалност ще повиши потребителското използване на сайте, тъй като потребителя няма да има нужда да се логва всеки път когато сървъра се рестартира.
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**

###     **8. Use bycript for heshing the user password before it goes into the database**
        Да се използва bycriptjs за хеширане (скриване) на паролата на потребителя преди да отиде в базата от данни
####    **Importance: 2**
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**

More may be added soon...


## **Front-end / Client Side**
    **Note/Забележка: В тази част имаме най-много работа и трябва да се свърши с преоритет!**

###     **1. Use AJAX for POST/PUT/DELETE requests for creating/deleting/amending comments and posts**
        Да се използват AJAX заяки за POST/PUT/DELETE заявките за създаване/триене/променяне на коментари и постове
####    **Importance: 1**
        - Using AJAX is a mandatory requirement for the project. We can use AJAX for POST/PUT/DELETE request for comments and posts, as well as for when the user logs-out. With AJAX, when the above requests are made, the result will appear on the page without refreshing the page, which will increase the user experience.
        - Използването на AJAX е задължиелно изискване за проекта. Можем да иползваме AJAX за POST/PUT/DELETE заявките за коментарите и постовете, както и когато потребителя се лог-аутне. С AJAX при правене на горните заявки, резултата ще се появава на страницата без да се налага да се презарежда странцита, което подобрява потребителското използване на сайта.
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**


###     **2. Implement Subreadit header image, bottom-nav and footer**
        Имплементиране на снимката на събредита, долната навигация и footer-а
####    **Importance: 1**
        - Bottom-nav should have "Hottest", "Coldest", "Newest", "Oldest" buttons to use the existing routes for sorting the posts, the existing routes are different for the home page and for the subreadits, therefore the buttons should make different GET requests based on the route from which they are called. The footer is relatively easy task, but it would make the app more pleasent for the user.
        - Долната навигация трябва да има "Hottest", "Coldest", "Newest", "Oldest" бутони, които използват вече същевстуващите пътища в апликцяита за сортиране на постовете. Съществуващите пътища са различни за главната страница и за страниците с рализчните събредити, следователно бутоните трябва да правят различни GET заявки според страницата, от която са извикани. Footer-а е лесна задача, но допринася за по-приятната визия на сайта.
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**


###     **3. jQuery/CSS/PUG for better visualisation of the app**
        Ипозлзване на jQuery/CSS/PUG за по-добра визуализация на апликацията.
####    **Importance: 1**
        - At the moment the website is as ugly as it gets. Images are too big and are flying about on the page, you cannot tell which one is a comment, which one is a subreadit name, which one is a username. We can might as well rename the app Stephen Hawking - Great back-end and database, useless front-end and functionality (Apologies for the cruel joke on the late Stephen Hawking). 
        We can use the actual reddit website for reference on how to model the posts and the comments and we can improve it! (Let's face it reddit is not much prettier than what we currently have).
        JQUERY can be used for css classes modification and light animations to make it 'greasy' as our colleague Joro would say.
        - Невъзможно е апа да ни е по-грозен, от колкото е сега. Картинките са прекалено големи и летят по страницата, не може да се различни кое е коментар, кое е име на събредите, кое е потребителско име. Направо можем да прекръстим апликацията Стивън Хокинг - страхотен 'ум', но безполезен фронт-енд и функционалност (с извинение за грубата шега за почниалия Стивън Хокинг).
        Можем да ползваме [Истинския reddit.com сайт](www.reddit.com) за помощ в това как да моделираме коментарите и постовте и можем да го подобрим (Да сме честни, reddit сайта не е мого по-красива от нашия в сегашното му състояние).
        JQUERY може да се използва с манипулиране на и "леки" анимцаии, за да се направи 'мазничък', както би се изразил Жорката.
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**


###     **4.Combining the log-in and register pages into 1 and creating a pop-up modal for login and registering**
        Комбиниране на логин и регистрация страниците в 1 и създаване на изкачащ прозорец за логин и регистрация
####    **Importance: 3**
        - The login and registration routes and pages currently work fine and we can get away with finishing with them being as they are right now, however it will significantly increase the user experience if we implement the features stated in the title.
        **BE AWARE: this carries a great risk of breaking the currently working routes and the login and registration features of the app. If this is to be undertaken it MUST NOT be done close to release date as we risk to break a major requirement of the app.**
        - Сегашните логин и регистрация пътища работят добре и можем да издадем проекта с моментното им състояние, но правенето на функционалност посочена в заглавието на тази задача ще подобри значително потребителското използване на апликцаията.
        **ВНИМАНИЕ: тази задача носи висок риск да се развали сегашните (работещи) пътища и функционалност за логин и регистрация на апа. Ако тази задача ще бъде правена, то тя НЕ ТРЯБВА да бъде правена в близост до датата за издаване на апликцаята, защото рискуваме да счупим основно изискване на проекта**
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**


## **TESTING:**
    **Note/Забележка: тук се слага само 1 задача, но тя е доста мащабна и е задължителна**
###     **1. Implement testing for 50% of the application**
        Имплементиране на тестове за 50% от апликцаията
####    **Importance: 1**
        - This is a mandatory project requirement! We currently have quite a few tests already, however we have new controllers and new api functions and functionalities, which we need to test.
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**


## **GENERAL APP/PROJECT WORK**
###     **1. Deploy the app on the net via HEROKU**
###     **2. Create a MarkDown for documentationo of the app**
#####    **WHO IS WORKING ON IT / КОЙ ЩЕ РАБОТИ НАД ТОВА:**
#####   **STATUS:**