#import "lib.typ": *

#let horizontalrule = pagebreak(weak: true)

#show: report.with(
  title: [$title$],
  subtitle: [$subtitle$],
  client: [$client$],
  date: [$date$],
  version: [$version$],
  status: [$status$],
)

#show heading.where(level: 1): it => section-marker(it.body)
#show heading.where(level: 2): it => action-title(it.body)
#show heading.where(level: 3): it => sub-arg(it.body)

$body$

#check-insights()
