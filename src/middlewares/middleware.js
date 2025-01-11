    // exportando o modulo como uma função anonima que vai retornar algo

// module.exports = (req, res, next) => {
//     console.log();
//     console.log('Passei no middleware global.');
//     console.log();

//     if(req.body.cliente) {
//         console.log();
//         console.log(`Vi que você postou ${req.body.cliente}`);
//         console.log();
//     }

//     next();
// };

exports.middlewareGlobal = (req, res, next) => {
    // variavel global para errors
    res.locals.errors = req.flash('errors'); // mesmo nome la do ejs
    res.locals.success = req.flash('success'); // mesmo nome la do ejs
    res.locals.user = req.session.user;
    next();
};

exports.outroMiddleware = (req, res, next) => {
    console.log('Sou seu outro middleware');
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render('404');
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login');
        // sempre que eu vou redirecionar a pagina, é importante salvar a sessão
        req.session.save(() => res.redirect('/'));
        return; // garantir que não passe para baixo
    }

    // se o usuario estiver logado
    next();
};