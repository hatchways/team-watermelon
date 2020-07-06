const createError = require('http-errors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const { join } = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const listRouter = require('./routes/lists');
const productRouter = require('./routes/products');

const { json } = express;

var app = express();

//EXTERNAL DB CONFIG
mongoose
	.connect(process.env.MDB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => {
		console.log('Connected to external DB!');
	})
	.catch((err) => {
		console.log(err);
	});

app.use(logger('dev'));
app.use(json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use(listRouter);
app.use(productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;
