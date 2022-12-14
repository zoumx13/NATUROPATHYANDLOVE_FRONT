{
  articles.map((article) => {
    if (article.display === true) {
      const newdate = article.date;
      const date = new Date(newdate);
      const aDay = date.getDay();
      const theday = Object.values(day)[aDay - 1];
      const thejour = date.getDate();
      const aMonth = date.getMonth();
      const themonth = Object.values(month)[aMonth];
      const theyear = date.getFullYear();
      return (
        <Card className="card" key={article._id} style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src={`http://127.0.0.1:8080/articles/${article.imgIllustration}`}
          />
          <p className="date">
            {theday} {thejour} {themonth} {theyear}
          </p>
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.subtitle}</Card.Text>
            <Button
              value={article._id}
              onClick={(e) => detailsArticle(e.target.value)}
            >
              Lire
            </Button>
          </Card.Body>
        </Card>
      );
    }
  });
}
