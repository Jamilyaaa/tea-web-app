const helloUser = (req, res, next) => {
    res.locals.login = req.session?.login; // если в сессии есть login то его записываем в res.locals.username чтобы все hbs его видели
    next();
};

// пропускает пользователя, если он авторизован (т.е если есть ключ name в сессии) или редиректит на главную, если он
//авторизован (т.е если есть ключ name в сессии) или редиректит на главную, если он не авторизован (см стр 11 в index.js роутере )
const userChecker = (req, res, next) => {
    if (req.session.login) {
        return next();
    }
    res.redirect('/registration');
}

module.exports = { helloUser, userChecker };{}
