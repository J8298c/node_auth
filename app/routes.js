module.exports = (app, passport)=>{

    app.get('/', (req, res)=>{
        res.render('index');
    });

    /*
        Login
    */
    app.get('/login', (req, res)=>{
        res.render('login', {message: req.flash('loginMessage') })
    });

    //process login form
    //app.post('/login', do passport here);


    /*
    signup
    */

    app.get('/signup', (req, res)=>{
        res.render('signup', {message: req.flash('signupMesage')} );
    })

    //process signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));


    /*
    profile 
    */

    app.get('/profile', isLoggedIn, (req, res)=>{
        res.render('profile', {
            user: req.user
        });
    })


    /*
    logout
    */

    app.get('/logout', (req, res)=>{
        req.logout();
        res.redirect('/');
    });

};


function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}